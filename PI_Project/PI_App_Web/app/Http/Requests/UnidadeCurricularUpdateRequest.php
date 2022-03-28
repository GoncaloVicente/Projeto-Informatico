<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UnidadeCurricularUpdateRequest extends FormRequest
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
            'curso' => 'required',
            'semestre' => 'required',
            'anoLetivo' => 'required',
            'ano' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'curso.required' => 'O campo curso não pode estar vazio.',
            'semestre.required' => 'O campo semestre não pode estar vazio.',
            'anoLetivo.required' => 'O campo ano letivo não pode estar vazio.',
            'ano.required' => 'O campo ano não pode estar vazio.',
        ];
    }
}
