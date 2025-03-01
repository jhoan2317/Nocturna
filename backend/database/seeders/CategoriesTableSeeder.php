<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['title' => 'Casual'],
            ['title' => 'Deporte'],
            ['title' => 'Aventura'],
            ['title' => 'Cultura'],
            ['title' => 'Entretenimiento'],
            ['title' => 'Educación'],
            ['title' => 'Salud y Bienestar'],
            ['title' => 'Tecnología'],
            ['title' => 'Arte'],
            ['title' => 'Naturaleza'],
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(12);
            Category::updateOrCreate($item);
        }
    }
}