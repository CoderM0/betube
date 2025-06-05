<?php

use App\Http\Controllers\BaseController;
use App\Http\Controllers\CommentController;

use App\Http\Controllers\MoviesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserChannelController;
use App\Http\Controllers\VidChannelController;

use App\Models\Video;
use App\Models\VideoRating;
use App\OutServices\Recommenation;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::middleware(['auth'])->group(function () {
    Route::get("/search", [BaseController::class, 'search'])->name("user.search");
    Route::post("/channels/{channel}/subscribe", [VidChannelController::class, 'subscribe'])->name("user.subscribe");
    Route::get("/channels/create", [BaseController::class, 'create_channel'])->name("user.channel.create");
    Route::post("/channels/store", [BaseController::class, 'store_channel'])->name("user.channel.store");
    Route::get("/videos/{vid}/watch", [BaseController::class, 'watch_video'])->name("user.video.view");
    Route::post("/videos/{vid}/comment/add", [CommentController::class, 'add_comment'])->name("user.comment.add");
    Route::post("videos/{video_id}/comments/{comment_id}/reply/add", [CommentController::class, 'add_reply'])->name("user.reply.add");
    Route::post('/videos/{video}/like', [BaseController::class, 'like'])->name("user.video.like");
    Route::delete('/videos/{video}/unlike', [BaseController::class, 'unlike'])->name("user.video.unlike");
    //
    Route::post('/videos/{video}/dislike', [BaseController::class, 'dislike'])->name("user.video.dislike");
    Route::delete('/videos/{video}/undislike', [BaseController::class, 'undislike'])->name("user.video.undislike");

    //
    Route::get('/videos/liked', [BaseController::class, 'liked_videos'])->name("user.videos.liked");
    Route::get('/videos/watchedlater', [BaseController::class, 'watched_later_videos'])->name("user.videos.watched_later");
    // Route::get('/playlists/{play_list_id}', [BaseController::class, 'view_playlist'])->name("playlist.view");
    Route::post('/user/playlist/{playlist}/save', [BaseController::class, 'save_to_playlists'])->name('user.save_to_playlists');
    Route::get('/user/playlists/saved', [BaseController::class, 'saved_playlists'])->name('user.saved_playlists');
    Route::get('/play/playlist/{playlist}', [BaseController::class, 'playPlaylist'])->name('play.playlist');
    Route::get('/videos/hsitory/view', [BaseController::class, 'view_history'])->name("user.history.view");
    Route::post('/videos/{video}/watchlater', [BaseController::class, 'add_to_watch_later'])->name("user.video.watchlater");
    Route::controller(MoviesController::class)->prefix("movies")->group(function () {
        Route::get("/home", 'movies_home')->name("movies.home");
        Route::get("/{id}/view", 'view_details')->name("movie.view");
    });
});

///user channel
Route::middleware(['auth', 'can:has-channel'])->controller(UserChannelController::class)->prefix('mychannel')->group(function () {
    Route::get("/view",  'view_channel')->name("user.channel.view");
    Route::get("/videos",  'my_channel_videos')->name("user.channel.videos");
    Route::get("/playlists",  'my_channel_playlists')->name("user.channel.playlists");
    Route::get("/edit",  'edit_channel')->name("user.channel.edit");
    Route::get("/videos/upload",  'upload_video')->name("user.videos.upload");
    Route::get("/videos/{video_id}/edit",  'edit_video')->name("user.videos.edit");
    Route::post("/videos/{video_id}/update",  'update_video')->name("user.videos.update");
    Route::post("/channel/update",  'update_channel')->name("user.channel.update");
    Route::delete("/videos/{video}/delete",  'delete_video')->name("user.videos.delete");
    Route::get("/playlist/create",  'create_playlist')->name("user.playlists.create");
    Route::get("/playlists/{playlist}/edit",  'edit_playlist')->name("user.playlist.edit");

    Route::put("/playlists/{playlist}/update",  'update_playlist')->name("user.playlist.update");
    Route::delete("/playlists/{playlist}/delete",  'delete_playlist')->name("user.playlist.delete");
    Route::post("/playlist/store",  'store_playlist')->name("user.playlist.store");
    Route::post("/upload/save",  'save_video')->name("user.videos.save");
    Route::delete("/channel/delete", 'delete_channel')->name("channel.destroy");
});

//other channels
Route::middleware(['auth'])->controller(VidChannelController::class)->prefix("channel")->group(function () {
    Route::get("/{channel_id}/home", 'channel_home')->name("channels.channel.home"); //was user.channel.home
    Route::get("/{channel_id}/videos", 'channel_videos')->name("channels.channel.videos"); //was user.channel.videos
    Route::get("/{channel_id}/playlists", 'channel_playlists')->name("channels.channel.playlists"); //was user.channel.playlists
});
Route::get('/home', function () {
    $lastVideoRating = VideoRating::where("user_id", Auth::id())
        ->latest('updated_at')
        ->first();


    $recommendedVideoIds = [];
    if ($lastVideoRating) {

        $recommendedVideoIds = Recommenation::get_videos_recommendations(
            $lastVideoRating->video_id,
            $lastVideoRating->rating
        );
    }

    $allVideos = Video::with(["vid_channel", "watchLaterByUsers"])->get();


    $orderedVideos = $allVideos->sortBy(function ($video) use ($recommendedVideoIds) {

        $index = array_search($video->id, $recommendedVideoIds);
        return $index === false ? PHP_INT_MAX : $index;
    });

    return Inertia::render('Dashboard', ['videos' => $orderedVideos->values()->toArray()]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
