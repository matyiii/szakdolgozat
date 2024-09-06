<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
	}
}
