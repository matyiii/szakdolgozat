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
			->whereNull('is_approved')
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
			'is_approved' => 'required|boolean',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors(),
			], 422);
		}

		$validated = $validator->validated();
		$modelId = $validated['model_id'];
		$isApproved = $validated['is_approved'];

		$model = ThreeDModel::with(['user', 'category', 'images', 'files'])->find($modelId);

		$model->update([
			'is_approved' => $isApproved,
			'approved_at' => Carbon::now()->format('Y-m-d H:i:s'),
		]);

		$message = $isApproved ? 'Model approved successfully.' : 'Model denied successfully.';

		return response()->json([
			'message' => $message,
		], 200);
	}
}
