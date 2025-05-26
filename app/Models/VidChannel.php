<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VidChannel extends Model
{
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function videos()
    {
        return $this->hasMany(Video::class);
    }
    public function playlists()
    {
        return $this->hasMany(PlayList::class);
    }
}
