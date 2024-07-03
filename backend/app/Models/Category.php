<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
	protected $connection = 'mysql';
	protected $table = 'categories';

	protected $fillable = [
		'name',
	];

	public static function getAll()
	{
		return self::all();
	}
}
