<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAulaHasAlunoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aula_has_aluno', function (Blueprint $table) {
            $table->integer('aula_id');
            $table->foreign('aula_id')->references('id')->on('aula');
            $table->integer('aluno_id');
            $table->foreign('aluno_id')->references('id')->on('aluno');
            $table->primary(array('aula_id', 'aluno_id'));

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aula_has_aluno');
    }
}
