<?php

namespace App\Http\Controllers;

use App\Models\Category;

class SiteController extends Controller
{
	public function getCategories()
	{
		$categories = Category::getAll();

		return response()->json($categories);
	}
}
