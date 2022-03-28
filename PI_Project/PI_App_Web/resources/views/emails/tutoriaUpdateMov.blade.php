@component('mail::message')
# Tutoria alterada

Uma tutoria direcionada para si, pertencente à unidade curricular de __{{$uc->nome}}__ foi alterada pelo(a) aluno(a) __{{$aluno->nome}}__

@component('mail::panel')
    ## Nova Tutoria:
    Data: {{ $tutoria->data }}
    Hora de início: {{ $tutoria->horaInicio }}
    Assunto: {{$tutoria->assunto}}
    Descrição: {{($tutoria->descricao == null ? 'Vazia' : $tutoria->descricao)}}
    Sala: {{($sala == null ? 'Por definir' : $sala->nome)}}
@endcomponent

@component('mail::button', ['url' => 'http://142.93.142.208/#/tutorias'])
    Confirmar tutoria
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent