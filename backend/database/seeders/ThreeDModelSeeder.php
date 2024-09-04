<?php

namespace Database\Seeders;

use App\Models\ThreeDModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThreeDModelSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$models = [
			[
				'name' => 'Small Sphere',
				'is_banned' => 0,
				'is_highlighted' => 0,
				'like_count' => 0,
				'download_count' => 0,
				'user_id' => 1,
				'category_id' => 7,
			],
			[
				'name' => 'Medium Cone',
				'is_banned' => 0,
				'is_highlighted' => 0,
				'like_count' => 0,
				'download_count' => 0,
				'user_id' => 1,
				'category_id' => 1,
			],
			[
				'name' => 'Big Cube',
				'is_banned' => 0,
				'is_highlighted' => 0,
				'like_count' => 0,
				'download_count' => 0,
				'user_id' => 1,
				'category_id' => 5,
			],
			[
				'name' => 'Torus',
				'is_banned' => 0,
				'is_highlighted' => 0,
				'like_count' => 0,
				'download_count' => 0,
				'user_id' => 1,
				'category_id' => 3,
			],
		];

		ThreeDModel::insert($models);
	}
}
