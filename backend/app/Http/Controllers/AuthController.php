<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'name' => 'required|string|max:255|unique:App\Models\User,name',
			'email' => 'required|email|unique:App\Models\User,email',
			'password' => ['required', 'confirmed'/*, Password::min(8)->mixedCase()->numbers()*/]
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();

		$user = User::create([
			'name' => $validated['name'],
			'email' => $validated['email'],
			'password' => Hash::make($validated['password']),
		]);

		$token = $user->createToken('auth_token')->plainTextToken;

		$cookie = cookie('token', $token, 60 * 24); // 1day

		return response()->json([
			'user' => [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'created_at' => $user->created_at,
				'updated_at' => $user->updated_at,
			]
		])->withCookie($cookie);
	}

	public function login(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'email' => 'required|email|exists:App\Models\User,email',
			'password' => 'required'
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();

		$user = User::where('email', $validated['email'])->first();

		if (!$user || !Hash::check($validated['password'], $user->password)) {
			return response()->json([
				'message' => 'Email or password is incorrect!'
			], 401);
		}

		$token = $user->createToken('auth_token')->plainTextToken;

		$cookie = cookie('token', $token, 60 * 24);

		return response()->json([
			'user' => [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'created_at' => $user->created_at,
				'updated_at' => $user->updated_at,
			]
		])->withCookie($cookie);
	}

	public function logout(Request $request)
	{
		$request->user()->currentAccessToken()->delete();

		$cookie = cookie()->forget('token');

		return response()->json([
			'message' => 'Logged out successfully!'
		])->withCookie($cookie);
	}
}
