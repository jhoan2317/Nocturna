<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear permisos para eventos
        Permission::create(['name' => 'view events']);
        Permission::create(['name' => 'create events']);
        Permission::create(['name' => 'edit events']);
        Permission::create(['name' => 'delete events']);
        Permission::create(['name' => 'publish events']);

<<<<<<< HEAD
        // Permisos para lugares (antes marcas)
        Permission::create(['name' => 'view places']);
        Permission::create(['name' => 'create places']);
        Permission::create(['name' => 'edit places']);
        Permission::create(['name' => 'delete places']);
=======
        // Permisos para marcas
        Permission::create(['name' => 'view brands']);
        Permission::create(['name' => 'create brands']);
        Permission::create(['name' => 'edit brands']);
        Permission::create(['name' => 'delete brands']);
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831

        // Permisos para categorías
        Permission::create(['name' => 'view categories']);
        Permission::create(['name' => 'create categories']);
        Permission::create(['name' => 'edit categories']);
        Permission::create(['name' => 'delete categories']);

        // Permisos para usuarios
        Permission::create(['name' => 'view users']);
        Permission::create(['name' => 'create users']);
        Permission::create(['name' => 'edit users']);
        Permission::create(['name' => 'delete users']);
        Permission::create(['name' => 'block users']);

        // Permisos para comentarios
<<<<<<< HEAD
        Permission::create(['name' => 'view comments']);
=======
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
        Permission::create(['name' => 'create comments']);
        Permission::create(['name' => 'delete comments']);
        Permission::create(['name' => 'moderate comments']);

<<<<<<< HEAD
        // Permisos para preferencias
        Permission::create(['name' => 'view preferences']);
        Permission::create(['name' => 'manage preferences']);

        // Permisos para el panel de administración
        Permission::create(['name' => 'access admin panel']);
        Permission::create(['name' => 'manage admin panel']);

=======
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
        // Crear roles y asignar permisos
        
        // Administrador (acceso total)
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        // Cliente (puede crear y gestionar sus propios eventos)
        $client = Role::create(['name' => 'client']);
        $client->givePermissionTo([
            'view events',
            'create events',
            'edit events',
            'delete events',
<<<<<<< HEAD
            'view places',
            'view categories',
            'create comments',
            'view preferences',
            'manage preferences'
=======
            'view brands',
            'view categories',
            'create comments'
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
        ]);

        // Usuario normal (solo puede ver y guardar eventos, hacer comentarios)
        $user = Role::create(['name' => 'user']);
        $user->givePermissionTo([
            'view events',
<<<<<<< HEAD
            'view places',
            'view categories',
            'create comments',
            'view preferences',
            'manage preferences'
=======
            'view brands',
            'view categories',
            'create comments'
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
        ]);
    }
} 