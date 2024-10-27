<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ThreeDModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SiteController extends Controller
{
	public function getCategories()
	{
		$categories = Category::getAll();

		return response()->json($categories);
	}

	public function search(Request $request)
	{
		$query = $request->q;

		$filteredModels = ThreeDModel::with(['user', 'category', 'images', 'files'])
			->where('name', 'LIKE', "%{$query}%")
			->where('is_approved', 1)
			->orWhereHas('category', function ($q) use ($query) {
				$q->where('name', 'LIKE', "%{$query}%");
			})
			->orWhereHas('images', function ($q) use ($query) {
				$q->where('name', 'LIKE', "%{$query}%");
			})
			->orWhereHas('files', function ($q) use ($query) {
				$q->where('name', 'LIKE', "%{$query}%");
			})
			->get();

		return response()->json($filteredModels);
	}

	public function getUserById($user_id)
	{
		$validator = Validator::make(['user_id' => $user_id], [
			'user_id' => 'required|exists:App\Models\User,id',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$user = User::with([
			'models',
			'models.category',
			'models.images',
		])->find($user_id);

		if (!$user) {
			return response()->json([
				'error' => 'User not found'
			], 404);
		}

		return response()->json([
			'user' => $user,
		]);
	}
}
