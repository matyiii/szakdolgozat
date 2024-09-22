<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;

class ThreeDModel extends BaseModel
{
	protected $connection = 'mysql';
	protected $table = 'three_d_models';

	protected $fillable = [
		'name',
		'is_banned',
		'is_highlighted',
		'like_count',
		'download_count',
		'user_id',
		'category_id',
	];

	/* Relations */
	public function user()
	{
		return $this->belongsTo(User::class, 'user_id', 'id');
	}

	public function category()
	{
		return $this->hasOne(Category::class, 'id', 'category_id');
	}

	public function files()
	{
		return $this->hasMany(ThreeDFile::class, 'three_d_model_id', 'id');
	}

	public function images()
	{
		return $this->hasMany(ThreeDImage::class, 'three_d_model_id', 'id');
	}

	public function likedByUsers()
	{
		return $this->belongsToMany(User::class, 'model_user_likes')->withTimestamps();
	}

	public function comments()
	{
		return $this->hasMany(ModelUserComment::class)->orderByDesc('created_at');
	}

	/* Methods */
	public static function getHighlightedModels()
	{
		return self::with(['user', 'category', 'images', 'files'])
			->where('is_highlighted', 1)
			->get();
	}

	public static function getMostLikedModels()
	{
		return self::with(['user', 'category', 'images', 'files'])
			->orderBy('like_count', 'desc')
			->take(8)
			->get();
	}

	public static function getDiscoveredModels()
	{
		return self::with(['user', 'category', 'images', 'files'])
			->inRandomOrder()
			->take(4)
			->get();
	}

	public static function getById($id)
	{
		$model = self::with(['user', 'category', 'images', 'files', 'comments.user'])
			->find($id);

		$user = Auth::user();

		$model->is_liked = $user->likedModels->contains($model->id);

		return $model;
	}

	public static function updateDownloadCount($modelId)
	{
		$model = self::find($modelId);
		$model->update(['download_count' => $model->download_count + 1]);
	}
}
