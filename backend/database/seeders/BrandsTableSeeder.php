<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['title' => 'Iglesias'],
            ['title' => 'Hoteles'],
            ['title' => 'Restaurantes'],
            ['title' => 'Museos'],
            ['title' => 'Parques'],
            ['title' => 'Eventos'],
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(12);
            Brand::updateOrCreate($item);
        }
    }
}