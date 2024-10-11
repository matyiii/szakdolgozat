<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('three_d_models', function (Blueprint $table) {
			$table->id();
			$table->string('name');
			$table->boolean('is_highlighted')->default(0);
			$table->boolean('is_approved')->nullable();
			$table->timestamp('approved_at')->nullable();
			$table->unsignedInteger('like_count')->default(0);
			$table->unsignedInteger('download_count')->default(0);
			$table->foreignIdFor(User::class)->constrained();
			$table->foreignIdFor(Category::class)->constrained();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('three_d_models');
	}
};
