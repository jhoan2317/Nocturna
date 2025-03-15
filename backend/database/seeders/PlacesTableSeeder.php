<?php

namespace Database\Seeders;

use App\Models\Place;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class PlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'Catedral de Santiago',
                'description' => 'Hermosa catedral histórica ubicada en el centro de Santiago',
                'category_id' => 1, // Asumiendo que 1 es la categoría de Iglesias
                'location' => 'Plaza del Obradoiro, Santiago de Compostela',
                'imgPath' => 'places/catedral.jpg',
                'user_id' => 2 // ID del usuario con rol 'client'
            ],
            [
                'title' => 'Hotel Parador',
                'description' => 'Hotel histórico con vistas espectaculares a la ciudad',
                'category_id' => 2, // Asumiendo que 2 es la categoría de Hoteles
                'location' => 'Plaza do Obradoiro, 1',
                'imgPath' => 'places/parador.jpg',
                'user_id' => 2 // ID del usuario con rol 'client'
            ],
            [
                'title' => 'Restaurante Casa Marcelo',
                'description' => 'Restaurante con estrella Michelin que fusiona cocina gallega con asiática',
                'category_id' => 3, // Asumiendo que 3 es la categoría de Restaurantes
                'location' => 'Rúa Hortas, 1',
                'imgPath' => 'places/casa-marcelo.jpg',
                'user_id' => 2 // ID del usuario con rol 'client'
            ]
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(6) . '-' . Str::slug($item['title']);
            Place::updateOrCreate($item);
        }
    }
}