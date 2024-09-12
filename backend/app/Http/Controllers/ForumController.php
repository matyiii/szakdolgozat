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
		$topics = Topic::with([
			'user',
			'lastComment',
		])
			->where('forum_id', $request->forum_id)->get();

		return response()->json($topics);
	}
}
