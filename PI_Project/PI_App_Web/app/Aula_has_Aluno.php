<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Aula_has_Aluno extends Model
{
    public $timestamps = false;
    protected $table = 'aula_has_aluno';
    public $incrementing = false;
    protected $primaryKey = ['aula_id', 'aluno_id'];

    protected $fillable = [
        'aula_id', 'aluno_id'
    ];
}
