<?php

namespace App\Listeners;

use App\Aluno;
use App\Events\TutoriaConfirmed;
use App\Mail\TutoriaEmailConfirmed;
use App\Mail\TutoriaEmailCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendTutoriaEmailConfirmed
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
     * @param  TutoriaConfirmed  $event
     * @return void
     */
    public function handle(TutoriaConfirmed $event)
    {
        //enviar o email
        $aluno = Aluno::find($event->tutoria->aluno_id);
        Mail::to($aluno->numero.'@my.ipleiria.pt')
            ->send(new TutoriaEmailConfirmed($event->tutoria));
    }
}
