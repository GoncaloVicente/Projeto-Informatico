<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AulaUpdateRequest extends FormRequest
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
            'data' => 'required|date',
        ];
    }

    public function messages()
    {
        return [
            'data.required' => 'O campo data não pode estar vazio.',
            'data.date' => 'O formato da data não é válido.',
        ];
    }
}
