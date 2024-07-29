<?php

use App\Models\ThreeDModel;
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
        Schema::create('model_user_likes', function (Blueprint $table) {
            $table->id();
			$table->foreignIdFor(User::class)->constrained();
			$table->foreignIdFor(ThreeDModel::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('model_user_likes');
    }
};