<?php

namespace App\Http\Controllers;

use App\Models\ThreeDFile;
use App\Models\ThreeDImage;
use App\Models\ThreeDModel;
use Illuminate\Http\Request;
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
			'files.*' => 'file', //mimes:stl,jpeg,jpg,png,...
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validate();
		$threeDModel = ThreeDModel::create([
			'name' => $validated['name'],
			'is_banned' => false,
			'is_highlighted' => $validated['is_highlighted'],
			'like_count' => 0,
			'user_id' => 1,
			'category_id' => $validated['category_id'],
		]);

		// Process and store files
		foreach ($request->file('files') as $file) {
			$extension = $file->getClientOriginalExtension();
			$filename = $file->getClientOriginalName();

			if (in_array($extension, ['gcode', 'stl'])) {
				$path = $file->storeAs('uploads/models', $filename);

				ThreeDFile::create([
					'three_d_model_id' => $threeDModel->id,
					'name' => $filename,
					'path' => $path,
					'extension' => $extension,
				]);
			} elseif (in_array($extension, ['jpeg', 'jpg', 'png'])) {
				$path = $file->storeAs('uploads/images', $filename, 'public');

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
}
