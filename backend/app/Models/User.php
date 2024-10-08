<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'name',
		'email',
		'password',
		'google_id',
		'github_id',
		'role_id',
	];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		'password',
		'remember_token',
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
		'created_at' => 'datetime:Y-m-d H:i:s',
		'updated_at' => 'datetime:Y-m-d H:i:s',
	];

	/* Relations */
	public function likedModels()
	{
		return $this->belongsToMany(ThreeDModel::class, 'model_user_likes')->withTimestamps();
	}

	public function models()
	{
		return $this->hasMany(ThreeDModel::class, 'user_id', 'id');
	}

	public function role()
	{
		return $this->hasOne(Role::class, 'id', 'role_id');
	}

	/* Functions */
	public static function getDiscoveredUsers()
	{
		return self::withCount('models')
			->inRandomOrder()
			->take(4)
			->get();
	}
}
