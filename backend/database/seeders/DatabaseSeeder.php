<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ProfilesTableSeeder::class,
            CategoriesTableSeeder::class,
            BrandsTableSeeder::class,
            EventsTableSeeder::class,
            UsersTableSeeder::class
        ]);
    }
}
