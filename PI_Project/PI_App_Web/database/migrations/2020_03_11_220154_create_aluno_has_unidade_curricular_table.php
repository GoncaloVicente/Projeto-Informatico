<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlunoHasUnidadeCurricularTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aluno_has_unidade_curricular', function (Blueprint $table) {
            $table->integer('aluno_id');
            $table->foreign('aluno_id')->references('id')->on('aluno');
            $table->integer('uC_id');
            $table->foreign('uC_id')->references('id')->on('unidadecurricular');
            $table->primary(array('aluno_id', 'uC_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aluno_has_unidade_curricular');
    }
}
