<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    public function scopeFilter($query)
    {
        $query->where('title', 'like', '%' . request('search_film') . '%');
    }
}
