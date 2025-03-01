<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class ProfilesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['profilePic' => '1.jpg'],
            ['profilePic' => null],
            ['profilePic' => '3.jpg']
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(12);
            Profile::updateOrCreate($item);
        }
    }
}