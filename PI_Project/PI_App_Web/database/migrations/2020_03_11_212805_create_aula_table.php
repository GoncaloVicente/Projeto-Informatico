<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAulaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aula', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('codigo');
            $table->date('data');
            $table->integer('estado')->default(0); //0->ativa e 1->finalizada
            $table->integer('professor_id');
            $table->foreign('professor_id')->references('id')->on('professor');
            $table->integer('unidade_curricular_id');
            $table->foreign('unidade_curricular_id')->references('id')->on('unidadecurricular');
            $table->integer('isArchived')->default(0); //1->isArchived 0-> não
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
        Schema::dropIfExists('aula');
    }
}
