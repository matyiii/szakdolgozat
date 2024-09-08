<?php

namespace Database\Seeders;

use App\Models\Forum;
use Illuminate\Database\Seeder;

class ForumSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$forums = [
			[
				'name' => '3D Printing',
				'description' => 'Discussions about 3D printing techniques, hardware, and materials.',
			],
			[
				'name' => '3D Modeling',
				'description' => 'Discussions about 3D modeling software, design techniques, and best practices.',
			],
		];

		Forum::insert($forums);
	}
}
