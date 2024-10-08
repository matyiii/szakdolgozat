<?php

namespace Database\Seeders;

use App\Models\ThreeDModel;
use App\Models\User;
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
				'name' => 'AirTag Bike Saddle Holder',
				'is_banned' => 0,
				'is_highlighted' => 1,
				'is_approved' => 1,
				'like_count' => 0,
				'download_count' => 0,
				'user_id' => 1,
				'category_id' => 3,
			],
			[
				'name' => 'Small Sphere',
				'is_banned' => 0,
				'is_highlighted' => 1,
				'is_approved' => 1,
				'like_count' => 0,
				'download_count' => 0,
				'category_id' => 7,
			],
			[
				'name' => 'Medium Cone',
				'is_banned' => 0,
				'is_highlighted' => 0,
				'is_approved' => 1,
				'like_count' => 0,
				'download_count' => 0,
				'category_id' => 1,
			],
			[
				'name' => 'Big Cube',
				'is_banned' => 0,
				'is_highlighted' => 1,
				'is_approved' => 1,
				'like_count' => 0,
				'download_count' => 0,
				'category_id' => 5,
			],
			[
				'name' => 'Torus',
				'is_banned' => 0,
				'is_highlighted' => 1,
				'is_approved' => 0,
				'like_count' => 0,
				'download_count' => 0,
				'category_id' => 3,
			],
		];

		foreach ($models as &$model) {
			if (!isset($model['user_id'])) {
				$model['user_id'] = User::inRandomOrder()->first()->id;
			}
		}

		ThreeDModel::insert($models);
	}
}
