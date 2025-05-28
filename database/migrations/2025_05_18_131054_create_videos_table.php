<?php

use App\Models\PlayList;
use App\Models\VidChannel;
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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(VidChannel::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(PlayList::class)->nullable()->default(null)->constrained()->nullOnDelete();
            $table->json("tags");
            $table->string("title");
            $table->string("description");
            $table->string("file_path");
            $table->string("thumbnail_path");
            $table->integer("view_count")->default(0);
            $table->integer("duration");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
