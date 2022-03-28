<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CursoStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nome' => 'required|max:255|regex:/^[A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ ]+$/',
        ];
    }

    public function messages()
    {
        return [
            'nome.required' => 'O campo curso não pode estar vazio.',
            'nome.regex' => 'O campo nome apenas pode conter letras e espaços.',
            'nome.max' => 'O campo nome não pode ter mais que 255 carateres.',
        ];
    }
}
