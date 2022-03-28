<?php

namespace App\Listeners;

use App\Professor;
use App\Events\TutoriaConfirmedMov;
use App\Mail\TutoriaEmailConfirmedMov;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendTutoriaEmailConfirmedMov
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
     * @param  TutoriaConfirmedMov  $event
     * @return void
     */
    public function handle(TutoriaConfirmedMov $event)
    {
        $professor = Professor::find($event->tutoria->professor_id);
        Mail::to($professor->email)
            ->send(new TutoriaEmailConfirmedMov($event->tutoria));
    }
}
