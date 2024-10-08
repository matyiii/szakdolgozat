<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
	use HasFactory;

	protected $connection = 'mysql';
	protected $table = 'roles';

	protected $fillable = [
		'name',
	];

	protected $hidden = [
		'created_at',
		'updated_at',
	];
}
