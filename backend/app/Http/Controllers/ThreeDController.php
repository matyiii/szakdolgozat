<?php

namespace App\Http\Controllers;

use App\Models\ModelUserComment;
use App\Models\ThreeDFile;
use App\Models\ThreeDImage;
use App\Models\ThreeDModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use ZipArchive;

class ThreeDController extends Controller
{
	public function upload(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'model_name' => 'required|string',
			'category_id' => 'required|numeric|exists:App\Models\Category,id',
			'is_highlighted' => 'sometimes|boolean',
			'files' => 'required|array|min:1',
			'files.*.blobFile' => 'required|file',
			'files.*.name' => 'required|string',
			'files.*.status' => 'required|string|in:inited,processing,completed,failed',
		]);

		$hasStlFile = false;
		$hasImageFile = false;

		foreach ($request->file('files') as $file) {
			$extension = strtolower($file['blobFile']->getClientOriginalExtension());

			if ($extension === 'stl') {
				$hasStlFile = true;
			} elseif (in_array($extension, ['jpeg', 'jpg', 'png'])) {
				$hasImageFile = true;
			}

			if ($hasStlFile && $hasImageFile) {
				break;
			}
		}

		if (!$hasStlFile) {
			return response()->json([
				'message' => 'At least one STL file is required for upload.'
			], 422);
		}

		if (!$hasImageFile) {
			return response()->json([
				'message' => 'At least one image file (jpeg, jpg, png) is required for upload.'
			], 422);
		}

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();

		$threeDModel = ThreeDModel::create([
			'name' => $validated['model_name'],
			'is_highlighted' => $validated['is_highlighted'] ?? false,
			'like_count' => 0,
			'user_id' => $request->user()->id,
			'category_id' => $validated['category_id'],
		]);

		foreach ($request->file('files') as $file) {
			$blobFile = $file['blobFile'];
			$extension = strtolower($blobFile->getClientOriginalExtension());
			$filename = $blobFile->getClientOriginalName();

			if ($extension === 'stl') {
				$path = $blobFile->storeAs('uploads/models', $filename, 'public');
				ThreeDFile::create([
					'three_d_model_id' => $threeDModel->id,
					'name' => $filename,
					'path' => $path,
					'extension' => $extension,
				]);
			} elseif (in_array($extension, ['jpeg', 'jpg', 'png'])) {
				$path = $blobFile->storeAs('uploads/images', $filename, 'public');
				ThreeDImage::create([
					'three_d_model_id' => $threeDModel->id,
					'name' => $filename,
					'path' => $path,
					'extension' => $extension,
				]);
			} else {
				return response()->json([
					'message' => "Unsupported file type: $extension"
				], 422);
			}
		}

		return response()->json([
			'message' => 'Files uploaded successfully, awaiting approval.',
			'model_id' => $threeDModel->id,
		], 200);
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

	public function editComment(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'comment_id' => 'required|exists:App\Models\ModelUserComment,id',
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

		$comment = ModelUserComment::find($commentId);
		$comment->update([
			'text' => $newComment,
		]);


		return response()->json([
			'message' => 'Comment updated successfully.',
			'new_comment' => $comment,
		]);
	}

	public function downloadFile(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'model_id' => 'required|exists:App\Models\ThreeDModel,id',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();
		$modelId = $validated['model_id'];

		$files = ThreeDFile::where('three_d_model_id', $modelId)->get();
		$images = ThreeDImage::where('three_d_model_id', $modelId)->get();

		$zip = new ZipArchive;
		$zipFileName = 'model_' . $modelId . '_files.zip';
		$zipFilePath = storage_path('app/public/' . $zipFileName);

		if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
			foreach ($files as $file) {
				if (Storage::disk('public')->exists($file->path)) {
					$zip->addFile(storage_path('app/public/' . $file->path), $file->name);
				}
			}

			foreach ($images as $image) {
				if (Storage::disk('public')->exists($image->path)) {
					$zip->addFile(storage_path('app/public/' . $image->path), $image->name);
				}
			}

			$zip->close();

			ThreeDModel::updateDownloadCount($modelId);

			return response()
				->download($zipFilePath)
				->deleteFileAfterSend(true);
		} else {
			return response()->json(['error' => 'Failed to create ZIP file'], 500);
		}
	}

	public function discover()
	{
		$discoveredModels = ThreeDModel::getDiscoveredModels();
		$discoveredUsers = User::getDiscoveredUsers();

		return response()->json([
			'models' => $discoveredModels,
			'users' => $discoveredUsers
		]);
	}

	public function getFilteredModels(Request $request)
	{
		$categoryId = $request->query('category_id');
		$orderBy = $request->query('order_by');

		$query = ThreeDModel::with(['user', 'category', 'images', 'files']);

		if ($categoryId) {
			$query->where('category_id', $categoryId);
		}

		switch ($orderBy) {
			case 'newest':
				$query->orderBy('created_at', 'desc');
				break;
			case 'oldest':
				$query->orderBy('created_at', 'asc');
				break;
			case 'most_liked':
				$query->orderBy('like_count', 'desc');
				break;
			case 'most_downloaded':
				$query->orderBy('download_count', 'desc');
				break;
			default:
				$query->orderBy('created_at', 'desc');
				break;
		}

		$models = $query
			->where('is_approved', 1)
			->get()
			->take(4);

		return response()->json($models);
	}
}
