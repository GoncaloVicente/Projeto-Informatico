<?php

namespace App\Listeners;

use Adldap\Laravel\Events\AuthenticationSuccessful;
use App\Aluno;
use App\Professor;
use App\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class LogAuthSuccessful
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param AuthenticationSuccessful $event
     * @return void
     */
    public function handle(AuthenticationSuccessful $event)
    {
        if ($event->user->title[0] == 'Docente') {
            $prof = Professor::where('email', '=', $event->user->info[0])->get();
            if (($prof->count()) == 0) {
                $professor['nome'] = $event->user->cn[0];
                $professor['email']=$event->user->info[0];
                Professor::create($professor);
            }
            $us = User::where('id', '=', $event->model->id)->get();
            $tipoUser = $event->user->title[0];
            $us[0]->tipoUser = $tipoUser;
            $us[0]->save();
        }
    }
}

