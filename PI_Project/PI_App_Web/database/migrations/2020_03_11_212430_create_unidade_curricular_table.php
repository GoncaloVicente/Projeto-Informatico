<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadeCurricularTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidadecurricular', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('nome');
            $table->string('semestre');
            $table->string('anoLetivo');
            $table->string('ano');
            $table->integer('curso_id');
            $table->foreign('curso_id')->references('id')->on('curso');
            $table->integer('estado')->default(1);//1-> por ativo e 0 -> desativo
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
        Schema::dropIfExists('unidadecurricular');
    }
}
