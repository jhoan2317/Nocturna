<?php

namespace App\Http\Requests\Place;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePlaceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255|unique:places,title,' . $this->place->id,
            'description' => 'required|string',
            'location' => 'required|string',
            'imgPath' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'category_id' => 'required|exists:categories,id'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título es requerido',
            'title.string' => 'El título debe ser texto',
            'title.max' => 'El título no puede tener más de 255 caracteres',
            'title.unique' => 'Ya existe un lugar con este título',

            'description.required' => 'La descripción es requerida',
            'description.string' => 'La descripción debe ser texto',

            'location.required' => 'La ubicación es requerida',
            'location.string' => 'La ubicación debe ser texto',

            'imgPath.image' => 'El archivo debe ser una imagen',
            'imgPath.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg',
            'imgPath.max' => 'La imagen no debe pesar más de 2MB',
            
            'category_id.required' => 'La categoría es requerida',
            'category_id.exists' => 'La categoría seleccionada no existe'
        ];
    }
} 