<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VidChannel extends Model
{
    protected $appends = ['likes_count', 'dislikes_count', 'views', 'videos_count'];
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function subscribers()
    {
        return $this->belongsToMany(User::class, 'vid_channel_user');
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }
    public function playlists()
    {
        return $this->hasMany(PlayList::class);
    }
    public function getLikesCountAttribute()
    {
        return $this->videos->sum(function ($video) {

            return $video->likedByUsers->count();
        });
    }
    public function getDislikesCountAttribute()
    {
        return $this->videos->sum(function ($video) {

            return $video->dislikedByUsers->count();
        });
    }
    public function getViewsAttribute()
    {
        return $this->videos->sum(function ($video) {

            return $video->view_count;
        });
    }
    public function getVideosCountAttribute()
    {
        return $this->videos->count();
    }
}
