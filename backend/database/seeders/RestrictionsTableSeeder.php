<?php

namespace Database\Seeders;

use App\Models\Restriction;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class RestrictionsTableSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'event_id' => 1,
                'type' => 'age',
                'title' => 'Restricción de edad',
                'description' => 'Este evento está restringido a mayores de 18 años. Se requerirá identificación en la entrada.',
                'is_mandatory' => true
            ],
            [
                'event_id' => 1,
                'type' => 'capacity',
                'title' => 'Límite de aforo',
                'description' => 'El evento tiene un límite de 100 personas por sesión.',
                'is_mandatory' => true
            ],
            [
                'event_id' => 2,
                'type' => 'accessibility',
                'title' => 'Accesibilidad reducida',
                'description' => 'El lugar del evento tiene acceso limitado para sillas de ruedas. Por favor, contacte con anticipación para coordinar la asistencia.',
                'is_mandatory' => false
            ],
            [
                'event_id' => 3,
                'type' => 'dress_code',
                'title' => 'Código de vestimenta',
                'description' => 'Se requiere vestimenta formal. No se permite el acceso con ropa deportiva o casual.',
                'is_mandatory' => true
            ]
        ];

        foreach ($data as $item) {
            $item['slug'] = Str::random(6) . '-' . Str::slug($item['title']);
            Restriction::updateOrCreate($item);
        }
    }
} 