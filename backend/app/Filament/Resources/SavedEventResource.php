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

    public static function shouldRegisterNavigation(): bool
    {
        return true;
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
} 