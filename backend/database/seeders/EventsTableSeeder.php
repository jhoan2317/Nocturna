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
            ['title' => 'Iglesia San Francisco', 'description' => 'Una iglesia histórica en el centro de la ciudad.', 'location' => 'Calle 10 #5-10, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Iglesias/1.jpg', 'rating' => 4.5, 'category_id' => 1, 'brand_id' => 1],
            ['title' => 'Iglesia La Ermita', 'description' => 'Una iglesia famosa por su arquitectura gótica.', 'location' => 'Carrera 6 #7-20, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Iglesias/2.jpg', 'rating' => 4.5, 'category_id' => 1, 'brand_id' => 1],

            // Hoteles
            ['title' => 'Hotel Dann Monasterio', 'description' => 'Un hotel de lujo con vistas panorámicas.', 'location' => 'Carrera 10 #4-30, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Hoteles/1.jpg', 'rating' => 4.6, 'category_id' => 1, 'brand_id' => 2],
            ['title' => 'Hotel San Martín', 'description' => 'Un hotel acogedor en el corazón de la ciudad.', 'location' => 'Calle 5 #8-40, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Hoteles/2.jpg', 'rating' => 3, 'category_id' => 1, 'brand_id' => 2],

            // Restaurantes
            ['title' => 'Carmina', 'description' => 'Un restaurante elegante con cocina gourmet.', 'location' => 'Carrera 7 #6-50, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Restaurantes/1.jpg', 'rating' => 4.5, 'category_id' => 2, 'brand_id' => 3],
            ['title' => 'La Cosecha Parrillada', 'description' => 'Un restaurante conocido por sus parrilladas.', 'location' => 'Calle 8 #9-60, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Restaurantes/2.jpg', 'rating' => 4.3, 'category_id' => 2, 'brand_id' => 3],

            // Museos
            ['title' => 'Museo Nacional Guillermo Valencia', 'description' => 'Un museo dedicado a la vida y obra de Guillermo Valencia.', 'location' => 'Carrera 9 #10-70, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Museos/1.jpg', 'rating' => 4.45, 'category_id' => 2, 'brand_id' => 4],
            ['title' => 'Museo Guillermo León Valencia', 'description' => 'Un museo que exhibe la historia de Guillermo León Valencia.', 'location' => 'Calle 11 #12-80, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Museos/2.jpg', 'rating' => 4.75, 'category_id' => 2, 'brand_id' => 4],

            // Parques
            ['title' => 'Parque Caldas', 'description' => 'Un parque central con áreas verdes y monumentos.', 'location' => 'Carrera 12 #13-90, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Parques/1.jpg', 'rating' => 4.6, 'category_id' => 2, 'brand_id' => 5],
            ['title' => 'Torre del Reloj', 'description' => 'Un icónico reloj en el centro del parque.', 'location' => 'Calle 14 #15-100, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Parques/2.jpg', 'rating' => 5.0, 'category_id' => 2, 'brand_id' => 5],

            // Eventos
            ['title' => 'Campanario', 'description' => 'Un evento cultural en el centro comercial Campanario.', 'location' => 'Carrera 16 #17-110, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Eventos/1.jpg', 'rating' => 4.6, 'category_id' => 1, 'brand_id' => 6],
            ['title' => 'Festival de Música', 'description' => 'Un evento especial en el Hotel San Martín.', 'location' => 'Calle 18 #19-120, Popayán, Cauca', 'price' => 20000.00, 'imgPath' => 'Eventos/2.jpg', 'rating' => 3, 'category_id' => 1, 'brand_id' => 6],
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(12);
            Event::updateOrCreate($item);
        }
    }
}