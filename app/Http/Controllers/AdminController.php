<?php

namespace App\Http\Controllers;

use App\Models\VidChannel;
use App\Models\Video;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {

        return Inertia::render("Admin/AdminDashboard", ['channels' => VidChannel::with(['subscribers'])->get()]);
    }
    public function view_channel($channel_id)
    {
        $channel = VidChannel::with(['videos' => function ($query) {
            $query->withCount(['likedByUsers', 'dislikedByUsers']);
        }, 'subscribers'])->find($channel_id);

        return Inertia::render("Admin/AdminChannelView", ['channel' => $channel]);
    }
    public function delete_video($video)
    {
        $video = Video::with("vid_channel")->find($video);
        $channel_name = $video->vid_channel->channel_name;
        Storage::disk("public")->deleteDirectory(" $channel_name/$video->title");
        $video->delete();
        return redirect()->back();
    }
    public function delete_channel(VidChannel $channel)
    {


        Storage::disk("public")->deleteDirectory("$channel->channel_name");
        $channel->delete();
        return redirect()->route("admin.dashboard");
    }
}
