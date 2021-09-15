<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->integer('id_post')->primary();
            $table->integer('category_id')->nullable();
            $table->foreign('category_id')->references('id_category')->on('categories')->onDelete('cascade');
            $table->string('title');
            $table->text('summary');
            $table->text('content');
            $table->string('featured');
            $table->integer('social');
            $table->integer('active');
            $table->integer('type');
            $table->integer('link')->nullable();
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
        Schema::dropIfExists('posts');
    }
}
