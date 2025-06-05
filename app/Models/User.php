<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function channel()
    {
        return $this->hasOne(VidChannel::class);
    }
    public function subscribtions()
    {
        return $this->belongsToMany(VidChannel::class, 'vid_channel_user');
    }
    public function likedVideos()
    {

        return $this->belongsToMany(Video::class, 'user_video')
            ->withTimestamps();
    }
    public function dislikedVideos()
    {

        return $this->belongsToMany(Video::class, 'dislikes')
            ->withTimestamps();
    }
    public function laterVideos()
    {

        return $this->belongsToMany(Video::class, 'watch_later')
            ->withTimestamps();
    }

    public function userPlaylists()
    {

        return $this->belongsToMany(PlayList::class, 'saved_playlists')
            ->withTimestamps();
    }
    public function watchHistories()
    {
        return $this->hasMany(WatchHistory::class);
    }

    public function watchedVideos()
    {
        return $this->belongsToMany(Video::class, 'watch_histories', 'user_id', 'video_id')
            ->withTimestamps()
            ->withPivot('watched_at');
    }
}
