<?php

use App\Models\ThreeDModel;
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
		Schema::create('three_d_files', function (Blueprint $table) {
			$table->id();
			$table->string('name');
			$table->string('path');
			$table->string('extension');
			$table->foreignIdFor(ThreeDModel::class)->constrained();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('three_d_files');
	}
};
