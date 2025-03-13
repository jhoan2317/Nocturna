<?php

namespace App\Filament\Resources\SavedEventResource\Pages;

use App\Filament\Resources\SavedEventResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSavedEvents extends ListRecords
{
    protected static string $resource = SavedEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            //Actions\CreateAction::make(),
        ];
    }
} 