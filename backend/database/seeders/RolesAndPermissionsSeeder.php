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

        // Permisos para marcas
        Permission::create(['name' => 'view brands']);
        Permission::create(['name' => 'create brands']);
        Permission::create(['name' => 'edit brands']);
        Permission::create(['name' => 'delete brands']);

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
        Permission::create(['name' => 'create comments']);
        Permission::create(['name' => 'delete comments']);
        Permission::create(['name' => 'moderate comments']);

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
            'view brands',
            'view categories',
            'create comments'
        ]);

        // Usuario normal (solo puede ver y guardar eventos, hacer comentarios)
        $user = Role::create(['name' => 'user']);
        $user->givePermissionTo([
            'view events',
            'view brands',
            'view categories',
            'create comments'
        ]);
    }
} 