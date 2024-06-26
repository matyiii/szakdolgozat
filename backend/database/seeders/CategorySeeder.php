<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$categories = [
			'Art', 'Household', 'Hobby', 'Tool', 'Toy', 'Fashion', 'Other'
		];

		foreach ($categories as $c) {
			Category::create([
				'name' => $c
			]);
		}
	}
}
