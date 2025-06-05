<?php

namespace App\Http\Controllers;

use App\Models\PlayList;
use App\Models\User;
use App\Models\VidChannel;
use App\Models\Video;
use getID3;
use Illuminate\Broadcasting\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VidChannelController extends Controller
{

    public function channel_home($channel_id)
    {
        $channel = VidChannel::with("subscribers")->find($channel_id);
        $homeVid = Video::where("vid_channel_id", $channel->id)->get()->last();
        return Inertia::render("Channel/ChannelHome", ['video' => $homeVid, 'channel' => $channel]);
    }

    public function subscribe(VidChannel $channel)
    {
        $user = User::find(Auth::id());
        if ($user->subscribtions->contains($channel->id)) {
            $user->subscribtions()->detach($channel->id);
        } else {
            $user->subscribtions()->attach($channel->id);
        }
    }

    public  function channel_videos($channel_id)
    {
        $channel = VidChannel::with(['videos', "videos.watchLaterByUsers", "subscribers"])->find($channel_id);

        return Inertia::render("Channel/ChannelVideos", ['videos' => $channel->videos, 'channel' => $channel]);
    }

    public   function channel_playlists($channel_id)
    {
        $channel = VidChannel::with(['playlists', 'playlists.videos', 'playlists.savedByUsers', "subscribers"])->find($channel_id);

        return Inertia::render("Channel/ChannelPlayLists", ['playlists' => $channel->playlists, 'channel' => $channel]);
    }
}
