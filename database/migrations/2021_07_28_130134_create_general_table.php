<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeneralTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('general', function (Blueprint $table) {
            $table->integer('id_general')->primary();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('audio')->nullable();
            $table->text('address')->nullable();
            $table->text('phone')->nullable();
            $table->text('whatsapp')->nullable();
            $table->text('email')->nullable();
            $table->text('maps')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('general');
    }
}
