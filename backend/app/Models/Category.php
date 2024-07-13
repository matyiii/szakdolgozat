<?php

namespace App\Models;

class Category extends BaseModel
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
