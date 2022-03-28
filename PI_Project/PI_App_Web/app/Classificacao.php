<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classificacao extends Model
{
    public $timestamps = true;
    protected $table = 'classificacao';

    protected $fillable = [
        'id', 'valor', 'conteudo_id', 'aluno_id','aula_id','created_at', 'updated_at'
    ];
}
