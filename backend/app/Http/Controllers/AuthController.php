<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'username' => 'required|string|max:255|unique:App\Models\User,name',
			'email' => 'required|email|unique:App\Models\User,email',
			'password' => ['required', 'confirmed'/*, Password::min(8)->mixedCase()->numbers()*/],
			'is_privacy_ticked' => 'required|accepted',
		]);

		if ($validator->fails()) {
			return response()->json([
				'validator_failed' => $validator->errors()
			], 422);
		}

		$validated = $validator->validated();

		$user = User::create([
			'name' => $validated['username'],
			'email' => $validated['email'],
			'password' => Hash::make($validated['password']),
		]);

		$token = $user->createToken('auth_token')->plainTextToken;

		$user->load(['role']);

		return response()->json([
			'user' => [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'created_at' => $user->created_at,
				'updated_at' => $user->updated_at,
				'token' => $token,
				'role' => $user->role,
			]
		]);
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

		$user->load(['role']);

		return response()->json([
			'user' => [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'created_at' => $user->created_at,
				'updated_at' => $user->updated_at,
				'token' => $token,
				'role' => $user->role,
			]
		]);
	}

	public function logout(Request $request)
	{
		$request->user()->currentAccessToken()->delete();

		return response()->json([
			'message' => 'Logged out successfully!',
			'cors' => config('cors'),
			'sanctum' => config('sanctum'),
			'session' => config('session'),
			'auth' => config('auth')
		]);
	}

	public function redirectToGoogle()
	{
		return Socialite::driver('google')
			->stateless()
			->redirectUrl(env('GOOGLE_REDIRECT_URI'))
			->redirect()
			->getTargetUrl();
	}

	public function handleGoogleCallback()
	{
		dd(Socialite::driver('google')->stateless()->user());
		try {
			$googleUser = Socialite::driver('google')->stateless()->user();
			$user = User::where('email', $googleUser->email)->first();
			$visitorRole = Role::where('name', 'Visitor')->first();

			if (!$user) {
				$user = User::create([
					'name' => $googleUser->name,
					'email' => $googleUser->email,
					'google_id' => $googleUser->id,
					'password' => null,
					'role_id' => $visitorRole->id,
				]);
			}

			$token = $user->createToken('auth_token')->plainTextToken;

			$user->load(['role']);

			return response()->json([
				'user' => [
					'id' => $user->id,
					'name' => $user->name,
					'email' => $user->email,
					'token' => $token,
					'role' => $user->role,
				]
			]);
		} catch (Exception $e) {
			Log::error('Google authentication error: ' . $e->getMessage());
			return response()->json([
				'error' => 'Google authentication failed',
				'exception' => $e->getMessage()
			], 500);
		}
	}

	public function redirectToGithub()
	{
		return Socialite::driver('github')
			->stateless()
			->redirect()
			->getTargetUrl();
	}

	public function handleGithubCallback()
	{
		try {
			$githubUser = Socialite::driver('github')->stateless()->user();
			$user = User::where('email', $githubUser->email)->first();
			$visitorRole = Role::where('name', 'Visitor')->first();

			if (!$user) {
				$user = User::create([
					'name' => $githubUser->nickname,
					'email' => $githubUser->email,
					'github_id' => $githubUser->id,
					'password' => null,
					'role_id' => $visitorRole->id,
				]);
			}

			$token = $user->createToken('auth_token')->plainTextToken;

			$user->load(['role']);


			return response()->json([
				'oauth_type' => 'github',
				'user' => [
					'id' => $user->id,
					'name' => $user->name,
					'email' => $user->email,
					'created_at' => $user->created_at,
					'updated_at' => $user->updated_at,
					'token' => $token,
					'role' => $user->role,
				]
			]);
		} catch (Exception $e) {
			Log::error('Githun authentication error: ' . $e->getMessage());
			return response()->json([
				'error' => 'Github authentication failed',
				'exception' => $e->getMessage()
			], 500);
		}
	}
}
