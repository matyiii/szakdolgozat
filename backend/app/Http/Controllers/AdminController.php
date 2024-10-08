<?php

namespace App\Http\Controllers;

use App\Models\ThreeDModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
	public function getModelsInReview()
	{
		$models = ThreeDModel::with(['user', 'category', 'images', 'files'])
			->where('is_approved', 0)
			->orderByDesc('created_at')
			->get();

		return response()->json([
			'models' => $models,
		]);
	}

	public function approveModel(Request $request)
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

		$model = ThreeDModel::getById($modelId);

		$model->update([
			'is_approved' => true,
			'approved_at' => Carbon::now()->format('Y-m-d H:i:s'),
		]);

		return response()->json([
			'message' => 'Model approved successfully.',
		], 200);
	}
}
