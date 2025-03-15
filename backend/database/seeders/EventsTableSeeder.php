<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class EventsTableSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // Iglesias
            [
                'place_id' => 1,
                'title' => 'Semana Santa en San Francisco',
                'capacity' => '200',
                'price' => 20000.00,
                'description' => 'Celebración de la Semana Santa en la histórica Iglesia San Francisco.',
                'imgPath' => 'events/iglesias/semana-santa.jpg'
            ],
            [
                'place_id' => 1,
                'title' => 'Concierto de Música Sacra',
                'capacity' => '150',
                'price' => 25000.00,
                'description' => 'Concierto especial de música sacra en la Iglesia La Ermita.',
                'imgPath' => 'events/iglesias/concierto-sacro.jpg'
            ],

            // Hoteles
            [
                'place_id' => 2,
                'title' => 'Cena de Gala Dann Monasterio',
                'capacity' => '100',
                'price' => 150000.00,
                'description' => 'Cena de gala con los mejores chefs de la región.',
                'imgPath' => 'events/hoteles/cena-gala.jpg'
            ],
            [
                'place_id' => 2,
                'title' => 'Noche de Jazz',
                'capacity' => '80',
                'price' => 45000.00,
                'description' => 'Noche de jazz en vivo en el Hotel San Martín.',
                'imgPath' => 'events/hoteles/jazz-night.jpg'
            ],

            // Restaurantes
            [
                'place_id' => 3,
                'title' => 'Festival Gastronómico',
                'capacity' => '120',
                'price' => 75000.00,
                'description' => 'Festival de gastronomía local en Carmina.',
                'imgPath' => 'events/restaurantes/festival-gastronomico.jpg'
            ],
            [
                'place_id' => 3,
                'title' => 'Noche de Parrilla',
                'capacity' => '150',
                'price' => 55000.00,
                'description' => 'Experiencia única de parrilla en La Cosecha.',
                'imgPath' => 'events/restaurantes/parrilla-night.jpg'
            ],

        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(6) . '-' . Str::slug($item['title']);
            Event::create($item);
        }
    }
}