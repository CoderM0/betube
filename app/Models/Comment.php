<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];
    public function parent_comment()
    {
        return $this->belongsTo(Comment::class, "parent_comment_id");
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
