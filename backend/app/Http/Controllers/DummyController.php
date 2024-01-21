<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DummyController extends Controller
{
    public function test()
	{
		return response()->json([
			'msg' =>'Hello from Backend',
			'APP_NAME' => env('APP_NAME'),
		]);
	}
}
