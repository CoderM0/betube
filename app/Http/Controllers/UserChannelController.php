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
        $channel = VidChannel::with(['videos', "videos.watchLaterByUsers"])->where("user_id", Auth::id())->first();

        return Inertia::render("UserChannel/ManageVideos", ['videos' => $channel->videos, 'channel' => $channel]);
    }
    public function my_channel_playlists()
    {
        $channel = VidChannel::with(['playlists', 'playlists.videos'])->where("user_id", Auth::id())->first();
        return Inertia::render("UserChannel/ManagePlayLists", ['playlists' => $channel->playlists, 'channel' => $channel]);
    }
    public function upload_video()
    {
        $channel = VidChannel::where("user_id", Auth::id())->first();

        return Inertia::render("UserChannel/UploadVideo", ['channel' => $channel]);
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
}
