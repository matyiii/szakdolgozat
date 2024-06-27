<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThreeDImage extends Model
{
	protected $connection = 'mysql';
	protected $table = 'three_d_images';

	protected $fillable = [
		'name',
		'path',
		'extension',
	];
}
