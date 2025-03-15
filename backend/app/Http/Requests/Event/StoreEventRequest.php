<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'place_id' => 'required|exists:places,id',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'imgPath' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio',
            'title.max' => 'El título no puede tener más de 255 caracteres',
            
            'description.required' => 'La descripción es obligatoria',

            'place_id.required' => 'El lugar es obligatorio',
            'place_id.exists' => 'El lugar seleccionado no existe',

            'capacity.required' => 'La capacidad es obligatoria',
            'capacity.integer' => 'La capacidad debe ser un número entero',
            'capacity.min' => 'La capacidad debe ser al menos 1',

            'price.required' => 'El precio es obligatorio',
            'price.numeric' => 'El precio debe ser un número',
            'price.min' => 'El precio no puede ser negativo',

            'imgPath.image' => 'El archivo debe ser una imagen',
            'imgPath.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg, gif',
            'imgPath.max' => 'La imagen no puede ser mayor a 2MB'
        ];
    }
} 