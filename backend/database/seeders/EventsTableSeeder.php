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
            ['title' => 'Iglesia San Francisco', 'description' => 'men', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Iglesias/1.jpg', 'rating' => 4.5, 'category_id' => 1, 'brand_id' => 1],
            ['title' => 'Iglesia La Ermita', 'description' => 'men', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Iglesias/2.jpg', 'rating' => 4.5, 'category_id' => 1, 'brand_id' => 1],

            //Hoteles
            ['title' => 'Hotel Dann Monasterio', 'description' => 'women', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Hoteles/1.jpg', 'rating' => 4.6, 'category_id' => 1, 'brand_id' => 2],
            ['title' => 'Hotel San Martín', 'description' => 'men', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Hoteles/2.jpg', 'rating' => 3, 'category_id' => 1, 'brand_id' => 2],

            // Restaurantes
            ['title' => 'Carmina', 'description' => 'men', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Restaurantes/1.jpg', 'rating' => 4.5, 'category_id' => 2, 'brand_id' => 3],
            ['title' => 'La Cosecha Parrillada', 'description' => 'women', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Restaurantes/2.jpg', 'rating' => 4.3, 'category_id' => 2, 'brand_id' => 3],

            // Museos
            ['title' => 'Museo Nacional Guillermo Valencia', 'description' => 'women', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Museos/1.jpg', 'rating' => 4.45, 'category_id' => 2, 'brand_id' => 4],
            ['title' => 'Museo Guillermo León Valencia', 'description' => 'men', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Museos/2.jpg', 'rating' => 4.75, 'category_id' => 2, 'brand_id' => 4],

            // Parques
            ['title' => 'Parque Caldas', 'description' => 'men', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Parques/1.jpg', 'rating' => 4.6, 'category_id' => 2, 'brand_id' => 5],
            ['title' => 'Torre del Reloj', 'description' => 'women', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Parques/2.jpg', 'rating' => 5.0, 'category_id' => 2, 'brand_id' => 5],

            // Eventos
            ['title' => 'Campanario', 'description' => 'women', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Eventos/1.jpg', 'rating' => 4.6, 'category_id' => 1, 'brand_id' => 6],
            ['title' => 'Hotel San Martín', 'description' => 'men', 'location' => 'google.api', 'price' => 20000.00, 'imgPath' => 'Eventos/2.jpg', 'rating' => 3, 'category_id' => 1, 'brand_id' => 6],
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(12);
            Event::updateOrCreate($item);
        }
    }
}