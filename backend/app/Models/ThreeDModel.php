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
		'like_count',
	];

	public function category()
	{
		return $this->hasOne(Category::class, 'id', 'category_id');
	}

	public function files()
	{
		return $this->hasMany(ThreeDFile::class, 'id', 'three_d_model_id');
	}

	public function images()
	{
		return $this->hasMany(ThreeDImage::class, 'id', 'three_d_model_id');
	}
}
