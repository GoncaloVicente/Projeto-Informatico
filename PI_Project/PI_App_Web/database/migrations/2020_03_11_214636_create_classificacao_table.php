<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassificacaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classificacao', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->integer('valor');
            $table->integer('conteudo_id');
            $table->foreign('conteudo_id')->references('id')->on('conteudo');
            $table->integer('aluno_id');
            $table->foreign('aluno_id')->references('id')->on('aluno');
            $table->integer('aula_id');
            $table->foreign('aula_id')->references('id')->on('aula');
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
        Schema::dropIfExists('classificacao');
    }
}
