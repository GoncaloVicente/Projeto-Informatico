@component('mail::message')
# Confirmação de tutoria retirada

Uma tutoria direcionada para si, pertencente à unidade curricular de __{{$uc->nome}}__ foi cancelada pelo(a) aluno(a) __{{$aluno->nome}}__

@component('mail::panel')
    ## Tutoria:
    Data: {{ $tutoria->data }}
    Hora de início: {{ $tutoria->horaInicio }}
    Assunto: {{$tutoria->assunto}}
    Descrição: {{($tutoria->descricao == null ? 'Vazia' : $tutoria->descricao)}}
    Sala: {{($sala == null ? 'Por definir' : $sala->nome)}}
@endcomponent

@component('mail::button', ['url' => 'http://142.93.142.208/#/tutorias'])
    Ver tutoria
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent