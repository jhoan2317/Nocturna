<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'text' => 'required|string|max:500',
            'user_id' => 'required|exists:users,id',
            'place_id' => 'required|exists:places,id'
        ];
    }

    public function messages(): array
    {
        return [
            'text.required' => 'El comentario es obligatorio',
            'text.string' => 'El comentario debe ser texto',
            'text.max' => 'El comentario no puede tener más de 500 caracteres',

            'user_id.required' => 'El usuario es obligatorio',
            'user_id.exists' => 'El usuario no existe',
            
            'place_id.required' => 'El lugar es obligatorio',
            'place_id.exists' => 'El lugar no existe'
        ];
    }
} 