<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tutoria extends Model
{
    public $timestamps = true;
    protected $table = 'tutoria';

    protected $fillable = [
        'id', 'pedido', 'data', 'horaInicio', 'assunto', 'descricao', 'estado', 'sala_id', 'professor_id', 'aluno_id', 'unidade_curricular_id', 'isArchivedProfessor', 'isArchivedAluno', 'created_at', 'updated_at'
    ];
}
