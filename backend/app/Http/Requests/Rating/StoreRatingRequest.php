<?php

namespace App\Http\Requests\Rating;

use Illuminate\Foundation\Http\FormRequest;

class StoreRatingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'place_id' => 'required|exists:places,id',
            'score' => 'required|integer|min:1|max:5'
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'El usuario es requerido',
            'user_id.exists' => 'El usuario no existe',

            'place_id.required' => 'El lugar es requerido',
            'place_id.exists' => 'El lugar no existe',
            
            'score.required' => 'La calificación es requerida',
            'score.integer' => 'La calificación debe ser un número entero',
            'score.min' => 'La calificación mínima es 1',
            'score.max' => 'La calificación máxima es 5'
        ];
    }
} 