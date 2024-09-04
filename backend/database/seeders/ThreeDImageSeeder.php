<?php

namespace Database\Seeders;

use App\Models\ThreeDImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThreeDImageSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$images = [
			[
				'name' => 'small_sphere_1.PNG',
				'path' => 'uploads/images/small_sphere_1.PNG',
				'extension' => 'PNG',
				'three_d_model_id' => 1,
			],
			[
				'name' => 'medium_cone_1.PNG',
				'path' => 'uploads/images/medium_cone_1.PNG',
				'extension' => 'PNG',
				'three_d_model_id' => 2,
			],
			[
				'name' => 'big_cube_1.PNG',
				'path' => 'uploads/images/big_cube_1.PNG',
				'extension' => 'PNG',
				'three_d_model_id' => 3,
			],
			[
				'name' => 'torus_1.PNG',
				'path' => 'uploads/images/torus_1.PNG',
				'extension' => 'PNG',
				'three_d_model_id' => 4,
			],
		];

		ThreeDImage::insert($images);
	}
}
