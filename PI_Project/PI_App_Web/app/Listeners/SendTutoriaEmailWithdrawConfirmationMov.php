<?php

namespace App\Listeners;

use App\Professor;
use App\Events\TutoriaWithdrawConfirmationMov;
use App\Mail\TutoriaEmailWithdrawConfirmationMov;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendTutoriaEmailWithdrawConfirmationMov
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
     * @param  TutoriaWithdrawConfirmationMov  $event
     * @return void
     */
    public function handle(TutoriaWithdrawConfirmationMov $event)
    {
        //enviar o email
        $professor = Professor::find($event->tutoria->professor_id);
        Mail::to($professor->email)
            ->send(new TutoriaEmailWithdrawConfirmationMov($event->tutoria));
    }
}
