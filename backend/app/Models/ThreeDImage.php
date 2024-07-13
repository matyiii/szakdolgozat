<?php

namespace App\Models;

class ThreeDImage extends BaseModel
{
	protected $connection = 'mysql';
	protected $table = 'three_d_images';

	protected $fillable = [
		'name',
		'path',
		'extension',
		'three_d_model_id',
	];
}
