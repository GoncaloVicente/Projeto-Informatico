@component('mail::message')
# Tutoria criada

Uma tutoria direcionada para si, pertencente à unidade curricular de __{{$uc->nome}}__ foi criada pelo(a) professor(a) __{{$professor->nome}}__

@component('mail::panel')
    ## Tutoria:
    Data: {{ $tutoria->data }}
    Hora de início: {{ $tutoria->horaInicio }}
    Assunto: {{$tutoria->assunto}}
    Descrição: {{($tutoria->descricao == null ? 'Vazia' : $tutoria->descricao)}}
    Sala: {{($sala == null ? 'Por definir' : $sala->nome)}}
@endcomponent

{{--@component('mail::button', ['url' => 'http://smartfeedback:8080/#/tutorias'])--}}
{{--    Confirmar tutoria--}}
{{--@endcomponent--}}

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
