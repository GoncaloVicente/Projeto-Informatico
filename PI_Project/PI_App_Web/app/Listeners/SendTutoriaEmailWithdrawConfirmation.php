<?php

namespace App\Listeners;

use App\Aluno;
use App\Events\TutoriaWithdrawConfirmation;
use App\Mail\TutoriaEmailConfirmed;
use App\Mail\TutoriaEmailWithdrawConfirmation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendTutoriaEmailWithdrawConfirmation
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
     * @param  TutoriaWithdrawConfirmation  $event
     * @return void
     */
    public function handle(TutoriaWithdrawConfirmation $event)
    {
        //enviar o email
        $aluno = Aluno::find($event->tutoria->aluno_id);
        Mail::to($aluno->numero.'@my.ipleiria.pt')
            ->send(new TutoriaEmailWithdrawConfirmation($event->tutoria));
    }
}
