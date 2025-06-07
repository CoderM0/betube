<?php

namespace App\Http\Controllers;

use App\Models\PlayList;
use App\Models\VidChannel;
use App\Models\Video;
use getID3;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserChannelController extends Controller
{
    public function view_channel()
    {
        $channel = VidChannel::with(['videos'])->where("user_id", Auth::id())->first();
        $homeVid = Video::where("vid_channel_id", $channel->id)->get()->last();
        return Inertia::render("UserChannel/Home", ['channel' => $channel, 'video' => $homeVid]);
    }
    public  function my_channel_videos()
    {
        $channel = VidChannel::with(['videos' => function ($query) {
            $query->latest();
        }, "videos.watchLaterByUsers"])->where("user_id", Auth::id())->first();

        return Inertia::render("UserChannel/ManageVideos", ['videos' => $channel->videos, 'channel' => $channel]);
    }
    public function my_channel_playlists()
    {
        $channel = VidChannel::with(['playlists', 'playlists.videos'])->where("user_id", Auth::id())->first();
        return Inertia::render("UserChannel/ManagePlayLists", ['playlists' => $channel->playlists, 'channel' => $channel]);
    }
    public function my_channel_statistics()
    {
        $channel = VidChannel::with('subscribers')->where("user_id", Auth::id())->first();
        return Inertia::render("UserChannel/ChannelStatistics", ['channel' => $channel]);
    }
    public function edit_channel()
    {
        $channel = VidChannel::where("user_id", Auth::id())->first();
        return Inertia::render("UserChannel/EditChannel", ['channel' => $channel]);
    }
    public function upload_video()
    {
        $channel = VidChannel::where("user_id", Auth::id())->first();

        return Inertia::render("UserChannel/UploadVideo", ['channel' => $channel]);
    }
    public function edit_video($video_id)
    {
        $video = Video::findOrFail($video_id);
        $channel = VidChannel::where("user_id", Auth::id())->first();
        if ($video->vid_channel_id != $channel->id) {
            abort("not authorized to view this page");
        }

        return Inertia::render("UserChannel/EditVideo", ['channel' => $channel, 'video' => $video]);
    }
    public function save_video()
    {

        request()->validate([
            'title' => 'required',
            'tags' => 'required',
            'description' => 'required',
            'video' => 'required',
            'thumbnail' => 'required|image'
        ]);
        $tags = explode(",", request()->tags);
        $vid_title = request()->title;
        $channel = VidChannel::where("user_id", Auth::id())->first();
        $thumpath = Storage::disk('public')->put("$channel->channel_name/$vid_title", request()->file("thumbnail"));
        $vidpath = Storage::disk('public')->put("$channel->channel_name/$vid_title", request()->file("video"));
        $fullPath = Storage::disk('public')->path($vidpath);
        $getID3 = new getID3;
        $fileInfo = $getID3->analyze($fullPath);
        $durationFormatted = round($fileInfo['playtime_seconds']);

        Video::create([
            'title' => request()->title,
            'description' => request()->description,
            'file_path' => $vidpath,
            'tags' => $tags,
            'duration' => $durationFormatted,
            'thumbnail_path' => $thumpath,
            'vid_channel_id' => $channel->id,
        ]);
        return redirect()->route("user.channel.view");
    }

    public function create_playlist()
    {
        $channel = VidChannel::with("videos")->where("user_id", Auth::id())->first();
        $vids = $channel->videos()->where("play_list_id", null)->get();

        return Inertia::render("UserChannel/CreatePlayList", ['videos' => $vids]);
    }
    public function edit_playlist($playlist)
    {
        $playlist = PlayList::with("videos")->findOrFail($playlist);
        $channel = VidChannel::where("user_id", Auth::id())->first();
        if ($channel->playlists->contains($playlist->id)) {
            $vids = $channel->videos()->where("play_list_id", null)->OrWhere("play_list_id", $playlist->id)->get();

            return Inertia::render("UserChannel/EditPlayList", ['videos' => $vids, 'playlist' => $playlist]);
        } else {
            abort("not authorized");
        }
    }
    public function store_playlist()
    {
        $channel = VidChannel::with("videos")->where("user_id", Auth::id())->first();

        request()->validate([
            'name' => "required",
            "videos" => "required"
        ]);
        $pl = PlayList::create([
            "name" => request()->name,
            "vid_channel_id" => $channel->id,
        ]);
        foreach (request()->videos as $key => $value) {
            $vid = Video::find($value);
            $vid->update(['play_list_id' => $pl->id]);
        }

        return redirect()->route("user.channel.playlists", $channel->id);
    }
    public function update_playlist(PlayList $playlist)
    {
        $channel = VidChannel::with("videos")->where("user_id", Auth::id())->first();

        request()->validate([
            'name' => "sometimes|string",
            "videos" => "required"
        ]);
        if (request()->name) {
            $playlist->name = request()->name;
            $playlist->save();
        }
        foreach ($playlist->videos as $play_list_video) {

            if (in_array($play_list_video->id, request()->videos)) {
                continue;
            } else {

                $play_list_video->update(['play_list_id' => null]);
            }
        }
        foreach (request()->videos as  $newvid) {
            $vid = Video::find($newvid);
            $vid->update(['play_list_id' => $playlist->id]);
        }
        return redirect()->route("user.channel.playlists", $channel->id);
    }
    public function delete_playlist(PlayList $playlist)
    {
        $playlist->delete();
        return redirect()->back();
    }
    public function update_video($video_id)
    {
        $validated =  request()->validate([
            'title' => 'sometimes|string',
            'tags' => 'sometimes',
            'description' => 'sometimes|string',
            'thumbnail_path' => 'sometimes|image'
        ]);
        $validated['tags'] = explode(",", request()->tags);

        $video = Video::findOrFail($video_id);
        $channel = VidChannel::where("user_id", Auth::id())->first();
        if ($video->vid_channel_id != $channel->id) {
            abort("not authorized to view this page");
        } else {
            if (request()->file('thumbnail_path')) {
                Storage::disk('public')->delete($video->thumbnail_path);
                $newthumbpath = Storage::disk("public")->put("$channel->channel_name/$video->title", request()->file("thumbnail_path"));
                $validated['thumbnail_path'] = $newthumbpath;
            }
            $video->update($validated);
        }
        return redirect()->route("user.channel.videos");
    }
    public function delete_video(Video $video)
    {
        $channel = VidChannel::where("user_id", Auth::id())->first();
        $channel_name = $channel->channel_name;
        $video_name = $video->title;

        Storage::disk("public")->deleteDirectory("$channel_name/$video_name");
        $video->delete();
        return redirect()->back();
    }
    public function delete_channel()
    {
        $channel = VidChannel::where("user_id", Auth::id())->first();

        Storage::disk("public")->deleteDirectory("$channel->channel_name");
        $channel->delete();
        return redirect()->route("dashboard");
    }
    public function update_channel()
    {

        $channel = VidChannel::where("user_id", Auth::id())->first();
        $validated = request()->validate([
            'channel_name' => 'sometimes',
            'description' => 'sometimes',
        ]);



        if (request()->file("logo")) {
            Storage::disk("public")->delete($channel->logo);
            $newlogopath = Storage::disk("public")->put("$channel->channel_name/logo", request()->file("logo"));
            $channel->update(['logo' => $newlogopath]);
        }
        if (request()->file("cover_img")) {

            Storage::disk("public")->delete($channel->cover_img);
            $newCoverpath = Storage::disk("public")->put("$channel->channel_name/cover", request()->file("cover_img"));
            $channel->update(['cover_img' => $newCoverpath]);
        }
        $channel->update($validated);
        return redirect()->route("user.channel.view");
    }
}
