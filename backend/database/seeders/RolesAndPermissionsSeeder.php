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

        // Permisos para solicitudes de cliente
        Permission::create(['name' => 'view_client_requests']);
        Permission::create(['name' => 'view_any_client_requests']);
        Permission::create(['name' => 'create_client_requests']);
        Permission::create(['name' => 'update_client_requests']);
        Permission::create(['name' => 'delete_client_requests']);
        Permission::create(['name' => 'approve_client_requests']);
        Permission::create(['name' => 'reject_client_requests']);

        // Permisos para eventos
        Permission::create(['name' => 'view_events']);
        Permission::create(['name' => 'view_any_events']);
        Permission::create(['name' => 'create_events']);
        Permission::create(['name' => 'update_events']);
        Permission::create(['name' => 'delete_events']);

        // Permisos para lugares
        Permission::create(['name' => 'view_places']);
        Permission::create(['name' => 'view_any_places']);
        Permission::create(['name' => 'create_places']);
        Permission::create(['name' => 'update_places']);
        Permission::create(['name' => 'delete_places']);

        // Permisos para categorías
        Permission::create(['name' => 'view_categories']);
        Permission::create(['name' => 'view_any_categories']);
        Permission::create(['name' => 'create_categories']);
        Permission::create(['name' => 'update_categories']);
        Permission::create(['name' => 'delete_categories']);

        // Permisos para restricciones
        Permission::create(['name' => 'view_restrictions']);
        Permission::create(['name' => 'view_any_restrictions']);
        Permission::create(['name' => 'create_restrictions']);
        Permission::create(['name' => 'update_restrictions']);
        Permission::create(['name' => 'delete_restrictions']);

        // Permisos para comentarios
        Permission::create(['name' => 'view_comments']);
        Permission::create(['name' => 'view_any_comments']);
        Permission::create(['name' => 'create_comments']);
        Permission::create(['name' => 'update_comments']);
        Permission::create(['name' => 'delete_comments']);

        // Permisos para preferencias
        Permission::create(['name' => 'view_preferences']);
        Permission::create(['name' => 'view_any_preferences']);
        Permission::create(['name' => 'create_preferences']);
        Permission::create(['name' => 'update_preferences']);
        Permission::create(['name' => 'delete_preferences']);

        // Permisos para roles
        Permission::create(['name' => 'view_roles']);
        Permission::create(['name' => 'view_any_roles']);
        Permission::create(['name' => 'create_roles']);
        Permission::create(['name' => 'update_roles']);
        Permission::create(['name' => 'delete_roles']);

        // Permisos para permisos
        Permission::create(['name' => 'view_permissions']);
        Permission::create(['name' => 'view_any_permissions']);
        Permission::create(['name' => 'create_permissions']);
        Permission::create(['name' => 'update_permissions']);
        Permission::create(['name' => 'delete_permissions']);

        // Permisos para calificaciones
        Permission::create(['name' => 'view_ratings']);
        Permission::create(['name' => 'view_any_ratings']);
        Permission::create(['name' => 'create_ratings']);
        Permission::create(['name' => 'update_ratings']);
        Permission::create(['name' => 'delete_ratings']);

        // Permisos para el panel de administración
        Permission::create(['name' => 'access_admin_panel']);
        Permission::create(['name' => 'manage_admin_panel']);

        // Crear roles y asignar permisos

        // Administrador (acceso total)
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        // Cliente (organizador de eventos)
        $client = Role::create(['name' => 'client']);
        $client->givePermissionTo([
            // Panel de Administración
            'access_admin_panel',

            // Eventos
            'view_events',
            'view_any_events',
            'create_events',
            'update_events',
            'delete_events',

            // Lugares
            'view_places',
            'view_any_places',
            'create_places',
            'update_places',
            'delete_places',

            // Categorías (solo ver)
            'view_categories',
            'view_any_categories',

            // Restricciones
            'view_restrictions',
            'view_any_restrictions',
            'create_restrictions',
            'update_restrictions',
            'delete_restrictions',

            // Comentarios (gestión de sus propios lugares/eventos)
            'view_comments',
            'view_any_comments',
            'update_comments',
            'delete_comments',

            // Calificaciones (ver y gestionar)
            'view_ratings',
            'view_any_ratings',
            'update_ratings',
            'delete_ratings',
        ]);

        // Usuario normal
        $user = Role::create(['name' => 'user']);
        $user->givePermissionTo([
            // Eventos y Lugares (solo ver)
            'view_events',
            'view_places',
            'view_categories',

            // Comentarios y Calificaciones (crear y gestionar propios)
            'create_comments',
            'create_ratings',

            // Preferencias (gestionar propias)
            'create_preferences',
            'update_preferences',
            'delete_preferences',

            // Solicitudes de cliente (crear)
            'create_client_requests',
        ]);
    }
}
