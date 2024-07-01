<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DummyController extends Controller
{
	public function test()
	{
		return response()->json([
			'cors' => config('cors'),
			'sanctum' => config('sanctum'),
			'session' => config('session'),
			'auth' => config('auth')
		]);
	}
}
