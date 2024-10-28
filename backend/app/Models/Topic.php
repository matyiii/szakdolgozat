<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Topic extends BaseModel
{
	use HasFactory;

	protected $connection = 'mysql';
	protected $table = 'topics';

	protected $fillable = [
		'forum_id',
		'user_id',
		'title',
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
		return $this->hasMany(TopicComment::class, 'topic_id', 'id');
	}

	public function lastComment()
	{
		return $this->hasOne(TopicComment::class, 'topic_id', 'id')->orderByDesc('created_at');
	}

	/* Functions */
	public static function getComments($forumId, $topicId)
	{
		$topic = self::with([
			'comments' => function ($query) {
				$query->orderBy('created_at', 'desc');
			},
			'comments.user:id,name',
		])
			->where([
				'id' => $topicId,
				'forum_id' => $forumId,
			])
			->first();

		return $topic->comments;
	}
}
