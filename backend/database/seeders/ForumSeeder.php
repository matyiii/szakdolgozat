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
			[
				'name' => '3D Printing Techniques',
				'description' => 'Explore advanced techniques for optimizing 3D printing processes and improving print quality.',
			],
			[
				'name' => '3D Design Software',
				'description' => 'A forum for discussing various 3D design software options, including reviews and recommendations.',
			],
		];

		foreach ($forums as $f) {
			Forum::create([
				'name' => $f['name'],
				'description' => $f['description'],
			]);
		}
	}
}
