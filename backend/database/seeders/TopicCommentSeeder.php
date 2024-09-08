<?php

namespace Database\Seeders;

use App\Models\Topic;
use App\Models\TopicComment;
use App\Models\User;
use Illuminate\Database\Seeder;

class TopicCommentSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$topics = Topic::all();
		$users = User::all();

		foreach ($topics as $topic) {
			TopicComment::create([
				'topic_id' => $topic->id,
				'user_id' => $users->random()->id,
				'comment' => 'This is a really interesting topic! I would love to learn more about it.'
			]);
		}

		// Adding some specific comments
		$topic1 = Topic::where('title', 'Best 3D Printers for Beginners?')->first();
		TopicComment::create([
			'topic_id' => $topic1->id,
			'user_id' => $users->random()->id,
			'comment' => 'I recommend the Ender 3 for beginners. It is affordable and has a large community for support.'
		]);

		$topic2 = Topic::where('title', 'Best Software for 3D Modeling?')->first();
		TopicComment::create([
			'topic_id' => $topic2->id,
			'user_id' => $users->random()->id,
			'comment' => 'Blender is a great free option for 3D modeling, though it has a bit of a learning curve.'
		]);
	}
}
