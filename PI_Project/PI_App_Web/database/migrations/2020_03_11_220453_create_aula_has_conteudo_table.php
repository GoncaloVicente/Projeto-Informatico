<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAulaHasConteudoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aula_has_conteudo', function (Blueprint $table) {
            $table->integer('aula_id');
            $table->foreign('aula_id')->references('id')->on('aula');
            $table->integer('conteudo_id');
            $table->foreign('conteudo_id')->references('id')->on('conteudo');
            $table->primary(array('aula_id', 'conteudo_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aula_has_conteudo');
    }
}
