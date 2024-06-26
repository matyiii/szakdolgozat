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
}
