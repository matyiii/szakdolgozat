<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Forum extends BaseModel
{
	use HasFactory;

	protected $connection = 'mysql';
	protected $table = 'forums';

	protected $fillable = [
		'name',
		'description'
	];

	/* Relations */
	public function topics()
	{
		return $this->hasMany(Topic::class, 'forum_id', 'id');
	}
}
