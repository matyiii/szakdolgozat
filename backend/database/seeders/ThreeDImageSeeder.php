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
				'name' => 'airtag_bike_saddle_1.jpg',
				'path' => 'uploads/images/airtag_bike_saddle_1.jpg',
				'extension' => 'jpg',
				'three_d_model_id' => 1,
			],
			[
				'name' => 'airtag_bike_saddle_2.jpg',
				'path' => 'uploads/images/airtag_bike_saddle_2.jpg',
				'extension' => 'jpg',
				'three_d_model_id' => 1,
			],
			[
				'name' => 'airtag_bike_saddle_3.jpg',
				'path' => 'uploads/images/airtag_bike_saddle_3.jpg',
				'extension' => 'jpg',
				'three_d_model_id' => 1,
			],
			[
				'name' => 'airtag_bike_saddle_4.jpg',
				'path' => 'uploads/images/airtag_bike_saddle_4.jpg',
				'extension' => 'jpg',
				'three_d_model_id' => 1,
			],
			[
				'name' => 'small_sphere_1.PNG',
				'path' => 'uploads/images/small_sphere_1.PNG',
				'extension' => 'PNG',
				'three_d_model_id' => 2,
			],
			[
				'name' => 'medium_cone_1.PNG',
				'path' => 'uploads/images/medium_cone_1.PNG',
				'extension' => 'PNG',
				'three_d_model_id' => 3,
			],
			[
				'name' => 'big_cube_1.PNG',
				'path' => 'uploads/images/big_cube_1.PNG',
				'extension' => 'PNG',
				'three_d_model_id' => 4,
			],
			[
				'name' => 'torus_1.PNG',
				'path' => 'uploads/images/torus_1.PNG',
				'extension' => 'PNG',
				'three_d_model_id' => 5,
			],
		];

		ThreeDImage::insert($images);
	}
}
