<?php

namespace App\Filament\Resources;

use App\Models\Brand;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\BrandResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class BrandResource extends Resource
{
    protected static ?string $model = Brand::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-storefront';

<<<<<<< HEAD
    protected static ?string $navigationGroup = 'Sitios Turísticos';

    protected static ?int $navigationSort = 2;



    public static function getNavigationLabel(): string
    {
        return 'Lugares';
=======
    protected static ?string $navigationGroup = 'Eventos';

    protected static ?int $navigationSort = 2;

    protected static ?string $navigationLabel = 'Marcas';

    public static function getNavigationLabel(): string
    {
        return 'Marcas';
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
    }

    public static function getNavigationTooltip(): string
    {
<<<<<<< HEAD
        return 'Gestionar categorías de eventos';
    }

    public static function shouldRegisterNavigation(): bool
    {
        return true;
=======
        return 'Gestionar marcas y proveedores';
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
<<<<<<< HEAD
                Section::make('Información de la Categoría')
=======
                Section::make('Información de la Marca')
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->label('Nombre'),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('events_count')
                    ->label('Eventos')
                    ->counts('events')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\ForceDeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
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
            'index' => Pages\ListBrands::route('/'),
            'create' => Pages\CreateBrand::route('/create'),
            'edit' => Pages\EditBrand::route('/{record}/edit'),
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