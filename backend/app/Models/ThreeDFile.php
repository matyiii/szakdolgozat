<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThreeDFile extends Model
{
	protected $connection = 'mysql';
	protected $table = 'three_d_files';

	protected $fillable = [
		'name',
		'path',
		'extension',
	];
}
