<?php

namespace Database\Seeders;

use DateTime;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        $date = new DateTime('now');
        $password1 = bcrypt('admin123');
        $password2 = bcrypt('client123');
        $password3 = bcrypt('user123');

        $data = [
            [
                'name' => 'Administrador',
                'last_name' => 'Sistema',
                'birthday' => '1990-01-01',
                'email' => 'admin@gmail.com',
                'password' => $password1,
                'role' => 'admin',
                'active' => 1,
                'profile_id' => 1,
                'created_at' => $date,
                'updated_at' => $date
            ],
            [
                'name' => 'Cliente',
                'last_name' => 'Ejemplo',
                'birthday' => '1985-05-15',
                'email' => 'client@gmail.com',
                'password' => $password2,
                'role' => 'client',
                'active' => 1,
                'profile_id' => 2,
                'created_at' => $date,
                'updated_at' => $date
            ],
            [
                'name' => 'Usuario',
                'last_name' => 'Normal',
                'birthday' => '1995-03-10',
                'email' => 'user@gmail.com',
                'password' => $password3,
                'role' => 'user',
                'active' => 1,
                'profile_id' => 3,
                'created_at' => $date,
                'updated_at' => $date
            ]
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(5) . '-' . Str::slug($item['name']);
            $user = User::updateOrCreate($item);
            $user->assignRole($item['role']);
        }
    }
}