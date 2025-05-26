<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Video extends Model
{
    protected $guarded = [];
    public function vid_channel()
    {
        return $this->belongsTo(VidChannel::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function likedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_video')
            ->withTimestamps();
    }
    public function watchLaterByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'watch_later')
            ->withTimestamps();
    }
    protected $casts = [
        'tags' => 'array'
    ];
}
