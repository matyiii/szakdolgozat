<?php

namespace Database\Seeders;

use App\Models\ThreeDFile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ThreeDFileSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$files = [
			[
				'name' => 'airtag_bike_saddle_v1.stl',
				'path' => 'uploads/models/airtag_bike_saddle_v1.stl',
				'extension' => 'stl',
				'three_d_model_id' => 1,
			],
			[
				'name' => 'small_sphere.stl',
				'path' => 'uploads/models/small_sphere.stl',
				'extension' => 'stl',
				'three_d_model_id' => 2,
			],
			[
				'name' => 'medium_cone.stl',
				'path' => 'uploads/models/medium_cone.stl',
				'extension' => 'stl',
				'three_d_model_id' => 3,
			],
			[
				'name' => 'big_cube.stl',
				'path' => 'uploads/models/big_cube.stl',
				'extension' => 'stl',
				'three_d_model_id' => 4,
			],
			[
				'name' => 'torus.stl',
				'path' => 'uploads/models/torus.stl',
				'extension' => 'stl',
				'three_d_model_id' => 5,
			],
		];

		ThreeDFile::insert($files);
	}
}
