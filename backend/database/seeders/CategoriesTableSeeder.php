<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['title' => 'Hoteles'],
            ['title' => 'Bares'],
            ['title' => 'Discotecas'],
            ['title' => 'Gastrobares'],
            ['title' => 'Restaurantes'],
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(6) . '-' . Str::slug($item['title']);
            Category::updateOrCreate($item);
        }
    }
}
