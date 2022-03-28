<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTutoriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tutoria', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('pedido');
            $table->date('data');
            $table->time('horaInicio');
            $table->string('assunto');
            $table->text('descricao')->nullable();
            $table->integer('estado')->default(0); //0-> por aceitar e 1 -> aceite
            $table->integer('sala_id')->nullable();
            $table->foreign('sala_id')->references('id')->on('sala');
            $table->integer('professor_id');
            $table->foreign('professor_id')->references('id')->on('professor');
            $table->integer('aluno_id');
            $table->foreign('aluno_id')->references('id')->on('aluno');
            $table->integer('unidade_curricular_id');
            $table->foreign('unidade_curricular_id')->references('id')->on('unidadecurricular');
            $table->integer('isArchivedProfessor')->default(0); //1->isArchived 0-> não
            $table->integer('isArchivedAluno')->default(0); //1->isArchived 0-> não
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
        Schema::dropIfExists('tutoria');
    }
}
