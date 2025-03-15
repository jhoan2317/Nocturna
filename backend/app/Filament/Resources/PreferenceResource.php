<?php

namespace App\Filament\Resources;

use App\Models\Preference;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\PreferenceResource\Pages;
use Illuminate\Database\Eloquent\Model;

class PreferenceResource extends Resource
{
    protected static ?string $model = Preference::class;

    protected static ?string $navigationIcon = 'heroicon-o-heart';

    protected static ?string $navigationGroup = 'Gestión de Usuarios';

    protected static ?int $navigationSort = 4;

    protected static ?string $navigationLabel = 'Preferencias';

    public static function getNavigationLabel(): string
    {
        return 'Preferencias';
    }

    public static function getNavigationTooltip(): string
    {
        return 'Gestionar preferencias de usuarios';
    }

    

    public static function getPermissionIdentifier(): string
    {
        return 'preferences';
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()->can('view_any_preferences');
    }

    public static function canCreate(): bool
    {
        return auth()->user()->can('create_preferences');
    }

    public static function canEdit(Model $record): bool
    {
        return auth()->user()->can('update_preferences');
    }

    public static function canDelete(Model $record): bool
    {
        return auth()->user()->can('delete_preferences');
    }

    public static function canViewAny(): bool
    {
        return auth()->user()->can('view_any_preferences');
    }

    public static function canView(Model $record): bool
    {
        return auth()->user()->can('view_preferences');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Información de la Preferencia')
                    ->schema([
                        Select::make('user_id')
                            ->relationship('user', 'name')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->label('Usuario'),
                        Select::make('category_id')
                            ->relationship('category', 'title')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->label('Categoría'),
                    ])
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
                TextColumn::make('category.title')
                    ->label('Categoría')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('user')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload()
                    ->label('Usuario'),
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'title')
                    ->searchable()
                    ->preload()
                    ->label('Categoría'),
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
            'index' => Pages\ListPreferences::route('/'),
            'create' => Pages\CreatePreference::route('/create'),
            'edit' => Pages\EditPreference::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery();
    }
} 