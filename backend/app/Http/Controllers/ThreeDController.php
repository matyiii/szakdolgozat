<?php

namespace App\Http\Controllers;

use App\Models\ModelUserComment;
use App\Models\ThreeDFile;
use App\Models\ThreeDImage;
use App\Models\ThreeDModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class ThreeDController extends Controller
{
	public function upload(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'model_name' => 'required|string',
			'category_id' => 'required|numeric', //exists
			'is_highlighted' => 'sometimes|boolean',
			'files' => 'required|array',
			'files.*.blobFile' => 'required|file',
			'files.*.name' => 'required|string',
			'files.*.status' => 'required|string|in:inited,processing,completed,failed',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();

		$threeDModel = ThreeDModel::create([
			'name' => $validated['model_name'],
			'is_banned' => false,
			'is_highlighted' => $validated['is_highlighted'] ?? false,
			'like_count' => 0,
			'user_id' => $request->user()->id,
			'category_id' => $validated['category_id'],
		]);

		foreach ($request->file('files') as $file) {
			$blobFile = $file['blobFile'];
			$extension = $blobFile->getClientOriginalExtension();
			$filename = $blobFile->getClientOriginalName();

			if (in_array($extension, ['stl'])) {
				$path = $blobFile->storeAs('uploads/models', $filename, 'public');

				ThreeDFile::create([
					'three_d_model_id' => $threeDModel->id,
					'name' => $filename,
					'path' => $path,
					'extension' => $extension,
				]);
			} elseif (in_array($extension, ['jpeg', 'jpg', 'png', 'PNG'])) {
				$path = $blobFile->storeAs('uploads/images', $filename, 'public');

				ThreeDImage::create([
					'three_d_model_id' => $threeDModel->id,
					'name' => $filename,
					'path' => $path,
					'extension' => $extension,
				]);
			}
		}

		return response()->json(['message' => 'Files uploaded successfully'], 200);
	}


	public function getHighlightedModels()
	{
		$highlightedModels = ThreeDModel::getHighlightedModels();

		return response()->json($highlightedModels);
	}

	public function getMostLikedModels()
	{
		$mostLikedModels = ThreeDModel::getMostLikedModels();

		return response()->json($mostLikedModels);
	}

	public function getModelById(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'id' => 'required|exists:App\Models\ThreeDModel,id',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();
		$id = $validated['id'];

		$model = ThreeDModel::getById($id);

		return response()->json([
			'model' => $model
		]);
	}

	public function loadFile(Request $request)
	{
		$fileId = $request->id;
		$threeDFile = ThreeDFile::find($fileId);

		return Response::file(storage_path('app/public/' . $threeDFile->path));
	}

	public function likeModel(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'model_id' => 'required|exists:App\Models\ThreeDModel,id',
			'is_liked' => 'required|bool',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();
		$modelId = $validated['model_id'];
		$isLiked = $validated['is_liked'];

		$user = Auth::user();
		$model = ThreeDModel::getById($modelId);

		if ($user->likedModels->contains($model->id)) {
			$user->likedModels()->detach($model->id);
			$model->decrement('like_count');
			$model->is_liked = !$isLiked;
			$message = 'Model unliked successfully';
		} else {
			$user->likedModels()->attach($model->id);
			$model->increment('like_count');
			$model->is_liked = !$isLiked;;
			$message = 'Model liked successfully';
		}

		return response()->json([
			'message' => $message,
			'model' => $model
		]);
	}

	public function postComment(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'model_id' => 'required|exists:App\Models\ThreeDModel,id',
			'text' => 'required|min:3|max:1000',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();
		$modelId = $validated['model_id'];
		$text = $validated['text'];

		$user = Auth::user();

		ModelUserComment::create([
			'user_id' => $user->id,
			'three_d_model_id' => $modelId,
			'text' => $text,
		]);

		$model = ThreeDModel::getById($modelId);

		return response()->json([
			'model' => $model
		], 200);
	}

	public function deleteComment(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'comment_user_id' => 'required|exists:App\Models\User,id',
			'comment_id' => 'required|exists:App\Models\ModelUserComment,id',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();
		$commentUserId = $validated['comment_user_id'];
		$commentId = $validated['comment_id'];

		$user = Auth::user();
		if ($user->id !== (int) $commentUserId) {
			return response()->json([
				'message' => 'You do not have permission to delete this comment.'
			], 403);
		}

		$comment = ModelUserComment::findOrFail($commentId);
		$comment->delete();

		return response()->json([
			'message' => 'Comment deleted successfully.',
			'comment_id' => $commentId,
		], 200);
	}
}
