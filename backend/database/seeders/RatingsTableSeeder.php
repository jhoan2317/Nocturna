<?php

namespace Database\Seeders;

use App\Models\Rating;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class RatingsTableSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'user_id' => 2, // Usuario normal
                'place_id' => 1, // Catedral
                'score' => 5
            ],
            [
                'user_id' => 3, // Usuario test
                'place_id' => 1, // Catedral
                'score' => 4
            ],
            [
                'user_id' => 2, // Usuario normal
                'place_id' => 2, // Hotel
                'score' => 5
            ],
            [
                'user_id' => 3, // Usuario test
                'place_id' => 3, // Restaurante
                'score' => 5
            ]
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(12);
            Rating::updateOrCreate($item);
        }
    }
} 