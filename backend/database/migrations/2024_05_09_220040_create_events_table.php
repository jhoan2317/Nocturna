<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->bigInteger('place_id')->unsigned();
            $table->foreign('place_id')->references('id')->on('places');
            $table->string('title');
            $table->string('capacity');
            $table->float('price');
            $table->text('description');
            $table->string('imgPath')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
