<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ThreeDModel;
use Illuminate\Http\Request;

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
}
