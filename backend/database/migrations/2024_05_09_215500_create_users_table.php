<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {//NOMBRE DE LA TABLA 
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');  
            $table->string('last_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->date('birthday')->nullable(); 
            $table->string('gender')->nullable();
            $table->string('role');
            $table->boolean('active')->default(1);

            $table->bigInteger('profile_id')->unsigned();
            $table->foreign('profile_id')->references('id')->on('profiles');

            $table->rememberToken();//TOKEN QUE GENERA CUANDO SE LOGEA
            $table->timestamps();// GENERA EL REGISTRO DE CUANDO SE CREO Y SE ACTUALIZO EL DATO
            $table->softDeletes();// PARA ELIMINAR DATOS PERO SOLO LA VISTA MAS NO EN LA BASE DE DATOS
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
