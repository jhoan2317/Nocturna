<?php

namespace App\Filament\Resources;

use App\Models\Rating;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\RatingResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Database\Eloquent\Model;

class RatingResource extends Resource
{
    protected static ?string $model = Rating::class;

    protected static ?string $navigationIcon = 'heroicon-o-star';

    protected static ?string $navigationGroup = 'Gestión de Contenido';

    protected static ?int $navigationSort = 4;

    protected static ?string $navigationLabel = 'Calificaciones';

    public static function getNavigationLabel(): string
    {
        return 'Calificaciones';
    }

    public static function getNavigationTooltip(): string
    {
        return 'Gestionar calificaciones de lugares';
    }

    

    public static function getPermissionIdentifier(): string
    {
        return 'ratings';
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()->can('view_any_ratings');
    }

    public static function canCreate(): bool
    {
        return auth()->user()->can('create_ratings');
    }

    public static function canEdit(Model $record): bool
    {
        return auth()->user()->can('update_ratings');
    }

    public static function canDelete(Model $record): bool
    {
        return auth()->user()->can('delete_ratings');
    }

    public static function canViewAny(): bool
    {
        return auth()->user()->can('view_any_ratings');
    }

    public static function canView(Model $record): bool
    {
        return auth()->user()->can('view_ratings');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required()
                    ->label('Usuario'),
                Select::make('place_id')
                    ->relationship('place', 'title')
                    ->required()
                    ->label('Lugar'),
                TextInput::make('score')
                    ->required()
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(5)
                    ->label('Puntuación'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Usuario')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('place.title')
                    ->label('Lugar')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('score')
                    ->label('Puntuación')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Fecha')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRatings::route('/'),
            'create' => Pages\CreateRating::route('/create'),
            'edit' => Pages\EditRating::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
} 