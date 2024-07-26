<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModelUserComment extends BaseModel
{
	use HasFactory, SoftDeletes;

	protected $connection = 'mysql';
	protected $table = 'model_user_comments';

	protected $fillable = [
		'user_id',
		'three_d_model_id',
		'text',
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
