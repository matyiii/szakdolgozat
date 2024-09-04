<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		User::create([
			'name' => 'Admin User',
			'email' => 'admin@admin.com',
			'password' => bcrypt('password123'),
		]);

		User::factory()->count(5)->create();
	}
}
