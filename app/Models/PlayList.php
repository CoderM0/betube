<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlayList extends Model
{
    protected $guarded = [];
    public function videos()
    {
        return $this->hasMany(Video::class);
    }
    public function vid_channel()
    {
        return $this->Belongsto(VidChannel::class);
    }
}
