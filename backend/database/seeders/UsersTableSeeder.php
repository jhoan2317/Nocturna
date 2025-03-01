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
        $date3 = date('1994-05-18');$password1 = bcrypt('admin123');
        $date1 = date('2002-06-10');$password2 = bcrypt('123456');
        $date2 = date('2003-10-21');$password3 = bcrypt('123456');
        $data = [
            ['name'=>'Administrador', 'last_name'=>'Pro', 'birthday'=>$date1, 'email'=>'admin@gmail.com', 'password'=>$password1, 'role'=>'admin', 'active'=>1, 'profile_id'=>1, 'created_at'=>$date, 'updated_at'=>$date],
            ['name'=>'Usuario1', 'last_name'=>'Prueba1', 'birthday'=>$date2, 'email'=>'user1@gmail.com', 'password'=>$password2, 'role'=>'user', 'active'=>1, 'profile_id'=>2, 'created_at'=>$date, 'updated_at'=>$date],
            ['name'=>'Usuario2', 'last_name'=>'Prueba2', 'birthday'=>$date3, 'email'=>'user2@gmail.com', 'password'=>$password3, 'role'=>'user', 'active'=>1, 'profile_id'=>3, 'created_at'=>$date, 'updated_at'=>$date]
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(5) . '-' . Str::slug($item['name']);
            User::updateOrCreate($item);
        }
    }
}