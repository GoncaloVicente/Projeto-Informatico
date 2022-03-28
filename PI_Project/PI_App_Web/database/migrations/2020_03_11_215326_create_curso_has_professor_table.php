<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCursoHasProfessorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('curso_has_professor', function (Blueprint $table) {
            $table->integer('curso_id');
            $table->foreign('curso_id')->references('id')->on('curso');
            $table->integer('professor_id');
            $table->foreign('professor_id')->references('id')->on('professor');
            $table->primary(array('curso_id', 'professor_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('curso_has_professor');
    }
}
