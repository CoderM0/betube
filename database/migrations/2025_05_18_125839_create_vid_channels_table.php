<?php

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
        Schema::create('vid_channels', function (Blueprint $table) {
            $table->id();
            $table->string('channel_name')->unique()->index();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete()->index();
            $table->string('description');
            $table->string('logo');
            $table->string('cover_img');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vid_channels');
    }
};
