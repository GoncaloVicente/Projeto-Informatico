<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conteudo extends Model
{
    use SoftDeletes;
    public $timestamps = true;
    protected $table = 'conteudo';

    protected $fillable = [
        'id', 'nome', 'tipo','descricao','tema_id' ,'created_at', 'updated_at'
    ];


}
