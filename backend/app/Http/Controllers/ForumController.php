<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Topic;
use Illuminate\Http\Request;

class ForumController extends Controller
{
	public function getForums()
	{
		$forums = Forum::all();
		return response()->json($forums);
	}

	public function getTopics(Request $request)
	{
		$forum = Forum::where('name', $request->forum)->get();

		$topics = Topic::where('forum_id', $forum->id)->get();

		return response()->json($topics);
	}
}
