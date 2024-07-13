<?php

namespace App\Models;

class ThreeDFile extends BaseModel
{
	protected $connection = 'mysql';
	protected $table = 'three_d_files';

	protected $fillable = [
		'name',
		'path',
		'extension',
		'three_d_model_id',
	];
}
