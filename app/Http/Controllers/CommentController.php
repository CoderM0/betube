<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function add_comment($vid)
    {
        request()->validate(['comment_text' => 'required']);
        Comment::create([
            'user_id' => Auth::id(),
            'video_id' => $vid,
            'comment_text' => request()->comment_text
        ]);
        return redirect()->back();
    }
    public function add_reply($video_id, $comment_id)
    {
        request()->validate(['comment_text' => 'required']);
        Comment::create([
            'user_id' => Auth::id(),
            'video_id' => $video_id,
            'parent_comment_id' => $comment_id,
            'comment_text' => request()->comment_text
        ]);
        return redirect()->back();
    }
}
