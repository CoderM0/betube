<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PlayList extends Model
{
    protected $guarded = [];
    public function videos()
    {
        return $this->hasMany(Video::class);
    }
    public function savedByUsers()
    {
        return $this->BelongsToMany(User::class, 'saved_playlists');
    }
    public function vid_channel()
    {
        return $this->Belongsto(VidChannel::class);
    }
}
