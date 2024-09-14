<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class TopicComment extends BaseModel
{
	use HasFactory;

	protected $connection = 'mysql';
	protected $table = 'topic_comments';

	protected $fillable = [
		'user_id',
		'topic_id',
		'comment',
	];

	/* Relations */
	public function user()
	{
		return $this->belongsTo(User::class, 'user_id', 'id');
	}

	public function topic()
	{
		return $this->belongsTo(Topic::class, 'topic_id', 'id');
	}
}
