<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Topic extends BaseModel
{
	use HasFactory;

	protected $connection = 'mysql';
	protected $table = 'topics';

	protected $fillable = [
		'name',
		'description'
	];

	/* Relations */
	public function user()
	{
		return $this->belongsTo(User::class, 'user_id', 'id');
	}

	public function forum()
	{
		return $this->belongsTo(Forum::class, 'forum_id', 'id');
	}

	public function comments()
	{
		return $this->hasMany(TopicComment::class, 'topic_comments_id', 'id');
	}
}
