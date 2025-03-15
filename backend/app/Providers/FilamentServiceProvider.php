<?php

namespace App\Providers;

use Filament\Facades\Filament;
use Illuminate\Support\ServiceProvider;
use App\Filament\Resources\EventResource;
use App\Filament\Resources\PlaceResource;
use App\Filament\Resources\CategoryResource;
use App\Filament\Resources\UserResource;
use App\Filament\Resources\CommentResource;
use App\Filament\Resources\RatingResource;
use App\Filament\Resources\RestrictionResource;

class FilamentServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Filament::serving(function () {
            if (auth()->check()) {
                $this->registerResourcePermissions();
            }
        });
    }

    protected function registerResourcePermissions(): void
    {
        $resources = [
            EventResource::class => 'view events',
            PlaceResource::class => 'view places',
            CategoryResource::class => 'view categories',
            UserResource::class => 'view users',
            CommentResource::class => 'view comments',
            RatingResource::class => 'view ratings',
            RestrictionResource::class => 'view restrictions',
        ];

        foreach ($resources as $resource => $permission) {
            $resource::shouldRegisterNavigation(fn() => auth()->user()->can($permission));
        }
    }
} 