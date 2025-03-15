<?php

namespace App\Filament\Resources;

use App\Models\SavedEvent;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\SavedEventResource\Pages;
use Illuminate\Database\Eloquent\Model;

class SavedEventResource extends Resource
{
    protected static ?string $model = SavedEvent::class;

    protected static ?string $navigationIcon = 'heroicon-o-heart';

    protected static ?string $navigationGroup = 'Sitios Turísticos';

    protected static ?int $navigationSort = 5;

    protected static ?string $navigationLabel = 'Preferencias';

    public static function getNavigationLabel(): string
    {
        return 'Preferencias';
    }

    public static function getNavigationTooltip(): string
    {
        return 'Gestionar eventos guardados por usuarios';
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Usuario')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('event.title')
                    ->label('Evento')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Guardado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSavedEvents::route('/'),
        ];
    }

    protected static function checkPermission(string $permission): bool
    {
        return auth()->check();
        // En producción, descomentar la siguiente línea y comentar la anterior:
        // return auth()->check() && auth()->user()->hasPermissionTo($permission);
    }

    public static function shouldRegisterNavigation(): bool
    {
        return static::checkPermission('view saved events');
    }

    public static function canCreate(): bool
    {
        return static::checkPermission('create saved events');
    }

    public static function canEdit(Model $record): bool
    {
        return static::checkPermission('edit saved events');
    }

    public static function canDelete(Model $record): bool
    {
        return static::checkPermission('delete saved events');
    }

    public static function canViewAny(): bool
    {
        return static::checkPermission('view saved events');
    }

    public static function canView(Model $record): bool
    {
        return static::checkPermission('view saved events');
    }
} 