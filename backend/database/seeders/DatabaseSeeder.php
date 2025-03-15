<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            UsersTableSeeder::class,
            CategoriesTableSeeder::class,
            PlacesTableSeeder::class,
            EventsTableSeeder::class,
            RatingsTableSeeder::class,
            RestrictionsTableSeeder::class
        ]);
    }
}
