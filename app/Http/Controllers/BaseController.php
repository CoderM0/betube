<?php

namespace App\Http\Controllers;

use App\Models\PlayList;
use App\Models\User;
use App\Models\VidChannel;
use App\Models\Video;
use App\Models\VideoRating;
use App\Models\WatchHistory;
use App\OutServices\Recommenation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BaseController extends Controller
{
    public function search()
    {
        $searchterm = request()->input('search');
        $videos = Video::query()
            ->when($searchterm, function ($query, $searchterm) {
                return $query->where('title', 'LIKE', "%{$searchterm}%")
                    ->orWhere('description', 'LIKE', "%{$searchterm}%");
            })->get();
        return Inertia::render("SearchResult", ['videos' => $videos, 'serachterm' => $searchterm]);
    }
    public function save_to_playlists(PlayList $playlist)
    {
        $user = User::find(Auth::id());
        if ($user->userPlaylists->contains($playlist->id)) {
            $user->userPlaylists()->detach($playlist->id);
        } else {
            $user->userPlaylists()->attach($playlist->id);
        }

        return redirect()->back();
    }
    public function saved_playlists()
    {
        $user = User::find(Auth::id());
        $playlists =  $user->userPlaylists()->withPivot('created_at')->with(["videos", 'savedByUsers'])
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render("Lists/SavedPlaylists", ['playlists' => $playlists]);
    }
    public function create_channel()
    {
        if (Auth::user()->is_publisher) {
            dd("yes");
        }
        return Inertia::render("CreateChannel");
    }
    public function store_channel()
    {

        request()->validate([
            'channel_name' => 'required',
            'description' => 'required',
            'logo' => 'required|image',
            'cover_img' => 'required|image'
        ]);
        $channel_name = request()->channel_name;
        $logo_path = Storage::disk('public')->put("$channel_name/logo", request()->file("logo"));
        $cover_path =  Storage::disk('public')->put("$channel_name/cover", request()->file("cover_img"));
        VidChannel::create([
            'channel_name' => request()->channel_name,
            'description' => request()->description,
            'logo' => $logo_path,
            'user_id' => Auth::id(),
            'cover_img' => $cover_path,
        ]);
        $user = User::find(Auth::id());
        $user->is_publisher = true;
        $user->save();

        return redirect()->route("user.channel.view");
    }
    public function add_to_watch_later(Video $video)
    {
        $user = User::find(Auth::id());
        if ($user->laterVideos->contains($video->id)) {
            $user->laterVideos()->detach($video->id);
        } else {
            $user->laterVideos()->attach($video->id);
        }

        return redirect()->back();
    }
    public function playPlaylist($playlist, Request $request)
    {
        if (request()->type == "playlist") {
            $playlist = PlayList::find($playlist);
            $videos = $playlist->videos()->with(["vid_channel", "vid_channel.subscribers", "comments", "comments.user", "comments.parent_comment"])->get();
        } else if (request()->type == "likedvideos") {
            $user = User::find(Auth::id());

            $playlist = ["id" => 1, "name" => "liked videos", "videos" => $user->likedVideos];
            $videos = $user->likedVideos()->with(["vid_channel", "vid_channel.subscribers", "comments", "comments.user", "comments.parent_comment"])->get();
        } else if (request()->type == "watchlater") {
            $user = User::find(Auth::id());

            $playlist = ["id" => 1, "name" => "watch later videos", "videos" => $user->laterVideos];
            $videos = $user->laterVideos()->with(["vid_channel", "vid_channel.subscribers", "comments", "comments.user", "comments.parent_comment"])->get();
        }
        $currentVideoId = $request->input('video');
        $currentVideoIndex = 0;

        if ($currentVideoId) {
            $currentVideoIndex = $videos->search(function ($video) use ($currentVideoId) {
                return $video->id == $currentVideoId;
            });

            if ($currentVideoIndex === false) {
                $currentVideoIndex = 0; // Default to the first video if the requested one is not found
            }
        }
        $userLiked = false;
        $userDisLiked = false;
        if (Auth::check()) {
            $userLiked =  $videos->get($currentVideoIndex)->likedByUsers()->where('user_id', Auth::id())->exists();
            $userDisLiked = $videos->get($currentVideoIndex)->dislikedByUsers()->where('user_id', Auth::id())->exists();
        }
        $currentUrl = request()->fullUrl();
        $previousUrl = request()->header('Referer');

        if ($previousUrl != $currentUrl) {

            $videos->get($currentVideoIndex)->view_count += 1;
            $videos->get($currentVideoIndex)->save();
        }
        WatchHistory::updateOrCreate(['user_id' => Auth::id(), 'video_id' => $videos->get($currentVideoIndex)->id], ['watched_at' => now()->format('Y-m-d H:i')]);
        return Inertia::render('Player/PlayListPlayer', [
            'playlist' => $playlist,
            'videos' => $videos,
            "list_type" => request()->type,
            'userLiked' => $userLiked,
            'userDisLiked' => $userDisLiked,
            'currentVideoIndex' => $currentVideoIndex,
            'currentVideo' => $videos->get($currentVideoIndex)->loadCount(['likedByUsers', 'dislikedByUsers']),
        ]);
    }
    public function watch_video($vid)
    {

        $currentUrl = request()->fullUrl();
        $previousUrl = request()->header('Referer');


        $vid = Video::with(["vid_channel", "vid_channel.subscribers", "comments", "comments.user", "comments.parent_comment"])->find($vid);
        WatchHistory::updateOrCreate(['user_id' => Auth::id(), 'video_id' => $vid->id], ['watched_at' => now()->format('Y-m-d H:i')]);


        $userLiked = false;
        $userDisLiked = false;

        if (Auth::check()) {
            $userLiked = $vid->likedByUsers()->where('user_id', Auth::id())->exists();
            $userDisLiked = $vid->dislikedByUsers()->where('user_id', Auth::id())->exists();
        }
        if ($previousUrl != $currentUrl) {

            $vid->view_count += 1;
            $vid->save();
        }


        $recommendedVideoIds = Recommenation::get_videos_recommendations(
            $vid->id,
            5
        );


        if ($recommendedVideoIds == null) {

            $channelVideos = Video::where('vid_channel_id', $vid->vid_channel_id)->whereNot("id", $vid->id)

                ->latest()
                ->take(6)
                ->get();
            if ($channelVideos->count() < 3) {
                $channelVideos =  Video::whereNot('id', $vid->id)->latest()->take(5)->get();
            }
            return Inertia::render("Player/PlayerHome", ['video' => $vid->loadCount(['likedByUsers', 'dislikedByUsers']), 'userLiked' => $userLiked, 'userDisLiked' => $userDisLiked, 'suggestions' => $channelVideos]);
        }
        $allVideos = Video::whereNot('id', $vid->id)->get();
        $orderedVideos = $allVideos->sortBy(function ($video) use ($recommendedVideoIds) {

            $index = array_search($video->id, $recommendedVideoIds);
            return $index === false ? PHP_INT_MAX : $index;
        });

        $vidsuugestion = $orderedVideos->values()->toArray();
        //
        // if ($vidsuugestion->count() < 7) {

        //     $remainingNeeded = 6 - $vidsuugestion->count();


        //     $channelVideos = Video::where('vid_channel_id', $vid->vid_channel_id)->whereNot("id", $vid->id)
        //         ->whereNotIn('id', $vidsuugestion->pluck('id')->toArray())
        //         ->latest()
        //         ->take($remainingNeeded)
        //         ->get();
        //     $suggestions = $vidsuugestion->concat($channelVideos)->take(6);
        // }


        return Inertia::render("Player/PlayerHome", ['video' => $vid->loadCount(['likedByUsers', 'dislikedByUsers']), 'userLiked' => $userLiked, 'userDisLiked' => $userDisLiked, 'suggestions' => $vidsuugestion]);
    }


    public function like(Video $video)
    {
        $user = User::find(Auth::id());
        if ($user->dislikedVideos->contains($video->id)) {
            $user->dislikedVideos()->detach($video->id);
        }
        $user->likedVideos()->attach($video->id);



        VideoRating::upsert(['user_id' => Auth::id(), 'video_id' => $video->id, 'rate' => 5], ['user_id', 'video_id']);

        return redirect()->back();
    }

    /**
     * Unlike a video.
     */
    public function unlike(Video $video)
    {
        $user = User::find(Auth::id());

        $user->likedVideos()->detach($video->id);
        VideoRating::upsert(['user_id' => Auth::id(), 'video_id' => $video->id, 'rate' => 2.5], ['user_id', 'video_id']);

        return redirect()->back();
    }
    //dislike
    public function dislike(Video $video)
    {
        $user = User::find(Auth::id());
        if ($user->likedVideos->contains($video->id)) {
            $user->likedVideos()->detach($video->id);
        }

        $user->dislikedVideos()->attach($video->id);


        VideoRating::upsert(['user_id' => Auth::id(), 'video_id' => $video->id, 'rate' => 1], ['user_id', 'video_id']);

        return redirect()->back();
    }
    public function undislike(Video $video)
    {
        $user = User::find(Auth::id());

        $user->dislikedVideos()->detach($video->id);
        VideoRating::upsert(['user_id' => Auth::id(), 'video_id' => $video->id, 'rate' => 3], ['user_id', 'video_id']);

        return redirect()->back();
    }
    //end dislike
    public function liked_videos()
    {
        $user = User::find(Auth::id());
        $vids =  $user->likedVideos()->withPivot('created_at')
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render("Lists/LikedVideos", ['videos' => $vids, 'list_name' => "Liked Videos", "type" => "likedvideos"]);
    }

    public function watched_later_videos()
    {
        $user = User::find(Auth::id());

        return Inertia::render("Lists/LikedVideos", ['videos' => $user->laterVideos, 'list_name' => "Watch Later Videos", "type" => "watchlater"]);
    }
    public function view_history()
    {
        $user = User::with("watchedVideos")->find(Auth::id());
        $vids =  $user->watchedVideos()->withPivot('watched_at')
            ->orderBy('pivot_watched_at', 'desc')
            ->get();

        return Inertia::render("Lists/WatchHistory", ['videos' =>   $vids]);
    }
    //  public function view_playlist($play_list_id)
    // {
    //    $pl= PlayList::with("videos")->find($play_list_id);
    //     return Inertia::render("Lists/WatchHistory", ['videos' => $pl]);
    // }
}
