<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Topic;
use App\Models\TopicComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
			'user:id,name',
			'lastComment',
		])
			->where('forum_id', $request->forum_id)->get();

		return response()->json($topics);
	}

	public function createTopic(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'forum_id' => 'required',
			'new_topic' => 'required',
			'new_topic.title' => 'required|string|max:255',
			'new_topic.description' => 'required|string',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();
		$user = Auth::user();

		$newTopic = Topic::create([
			'user_id' => $user->id,
			'forum_id' => $validated['forum_id'],
			'title' => $validated['new_topic']['title'],
			'description' => $validated['new_topic']['description'],
		]);

		return response()->json([
			'new_topic' => $newTopic
		]);
	}

	public function getComments(Request $request)
	{
		$comments = Topic::getComments($request->forum_id, $request->topic_id);

		return response()->json([
			'comments' => $comments
		]);
	}

	public function postComment(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'forum_id' => 'required|exists:App\Models\Forum,id',
			'topic_id' => 'required|exists:App\Models\Topic,id',
			'new_comment' => 'required|min:3|max:1000',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();
		$forumId = $validated['forum_id'];
		$topicId = $validated['topic_id'];

		$user = Auth::user();

		TopicComment::create([
			'user_id' => $user->id,
			'topic_id' => $topicId,
			'comment' => $validated['new_comment'],
		]);

		$comments = Topic::getComments($forumId, $topicId);

		return response()->json([
			'comments' => $comments
		], 200);
	}

	public function deleteComment(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'comment_id' => 'required|exists:App\Models\TopicComment,id',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();
		$commentId = $validated['comment_id'];

		TopicComment::find($commentId)->delete();

		return response()->json([
			'message' => 'Comment deleted successfully.',
			'comment_id' => $commentId,
		], 200);
	}

	public function editComment(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'comment_id' => 'required|exists:App\Models\TopicComment,id',
			'new_comment' => 'required|string|max:1000',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();
		$commentId = $validated['comment_id'];
		$newComment = $validated['new_comment'];

		$comment = TopicComment::find($commentId);
		$comment->update([
			'comment' => $newComment,
		]);


		return response()->json([
			'message' => 'Comment updated successfully.',
			'new_comment' => $comment,
		]);
	}
}
