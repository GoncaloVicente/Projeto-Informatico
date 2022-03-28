<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    public $timestamps = true;
    protected $table = 'sala';

    protected $fillable = [
        'id', 'nome', 'gabinete','created_at', 'updated_at'
    ];
}
