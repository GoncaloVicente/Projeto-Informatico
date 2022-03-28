<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    public $timestamps = true;
    protected $table = 'curso';

    protected $fillable = [
        'id', 'nome', 'estado', 'created_at', 'updated_at'
    ];

    public function professores()
    {
        return $this->belongsToMany(Professor::class);
    }
}
