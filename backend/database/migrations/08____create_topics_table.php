<?php

use App\Models\Forum;
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
		Schema::create('topics', function (Blueprint $table) {
			$table->id();
			$table->foreignIdFor(Forum::class)->constrained()->onDelete('cascade');
			$table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
			$table->string('title');
			$table->text('description');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('topics');
	}
};
