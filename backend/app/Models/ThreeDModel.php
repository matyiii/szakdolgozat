<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThreeDModel extends Model
{
	protected $connection = 'mysql';
	protected $table = 'three_d_models';

	protected $fillable = [
		'name',
		'is_banned',
		'is_highlighted',
		'like_count',
		'user_id',
		'category_id',
	];

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

	public static function getHighlightedModels()
	{
		return self::with(['category', 'images', 'files'])
			->where('is_highlighted', 1)
			->get();
	}

	public static function getMostLikedModels()
	{
		return self::with(['user', 'category', 'images', 'files'])
			->orderBy('like_count','desc')
			->take(10)
			->get();
	}
}
