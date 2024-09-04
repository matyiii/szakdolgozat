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
				'name' => 'small_sphere.stl',
				'path' => 'uploads/models/small_sphere.stl',
				'extension' => 'stl',
				'three_d_model_id' => 1,
			],
			[
				'name' => 'medium_cone.stl',
				'path' => 'uploads/models/medium_cone.stl',
				'extension' => 'stl',
				'three_d_model_id' => 2,
			],
			[
				'name' => 'big_cube.stl',
				'path' => 'uploads/models/big_cube.stl',
				'extension' => 'stl',
				'three_d_model_id' => 3,
			],
			[
				'name' => 'torus.stl',
				'path' => 'uploads/models/torus.stl',
				'extension' => 'stl',
				'three_d_model_id' => 4,
			],
		];

		ThreeDFile::insert($files);
	}
}
