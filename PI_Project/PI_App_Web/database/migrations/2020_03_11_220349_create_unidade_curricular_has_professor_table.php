<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadeCurricularHasProfessorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidade_curricular_has_professor', function (Blueprint $table) {
            $table->integer('uC_id');
            $table->foreign('uC_id')->references('id')->on('unidadecurricular');
            $table->integer('professor_id');
            $table->foreign('professor_id')->references('id')->on('professor');
            $table->primary(array('uC_id', 'professor_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unidade_curricular_has_professor');
    }
}
