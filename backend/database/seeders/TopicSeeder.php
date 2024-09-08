<?php

namespace Database\Seeders;

use App\Models\Forum;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$printingForum = Forum::where('name', '3D Printing')->first();
		$modelingForum = Forum::where('name', '3D Modeling')->first();

		$user = User::first();

		$topics = [
			[
				'forum_id' => $printingForum->id,
				'user_id' => $user->id,
				'title' => 'Best 3D Printers for Beginners?',
				'description' => 'I\'m new to 3D printing and would like recommendations for entry-level printers.'
			],
			[
				'forum_id' => $printingForum->id,
				'user_id' => $user->id,
				'title' => 'PLA vs ABS: Which filament is better?',
				'description' => 'Can anyone explain the differences between PLA and ABS filaments and which is better for general purpose prints?'
			],
			[
				'forum_id' => $modelingForum->id,
				'user_id' => $user->id,
				'title' => 'Best Software for 3D Modeling?',
				'description' => 'What software do you recommend for beginners in 3D modeling? I\'m particularly interested in free tools.'
			],
			[
				'forum_id' => $modelingForum->id,
				'user_id' => $user->id,
				'title' => 'How to optimize a model for 3D printing?',
				'description' => 'I\'m having trouble preparing my 3D models for printing. What should I look out for when optimizing a model?'
			]
		];

		Topic::insert($topics);
	}
}
