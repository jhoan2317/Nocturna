<?php

namespace App\Filament\Resources;

use App\Models\Event;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\ImageColumn;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\EventResource\Pages;
use Filament\Forms\Components\MarkdownEditor;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

<<<<<<< HEAD
    protected static ?string $navigationIcon = 'heroicon-o-calendar';

    protected static ?string $navigationGroup = 'Sitios Turísticos';
=======
    protected static ?string $navigationIcon = 'heroicon-o-ticket';

    protected static ?string $navigationGroup = 'Eventos';
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationLabel = 'Eventos';

    public static function getNavigationLabel(): string
    {
        return 'Eventos';
    }

    public static function getNavigationTooltip(): string
    {
        return 'Gestionar eventos y actividades';
    }

<<<<<<< HEAD
    public static function shouldRegisterNavigation(): bool
    {
        return true;
    }

=======
>>>>>>> b2b2cf4189ef85c0e5dfea594b9c8d7fd0f7d831
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Información del Evento')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->label('Título'),
                        MarkdownEditor::make('description')
                            ->required()
                            ->label('Descripción'),
                        TextInput::make('location')
                            ->required()
                            ->label('Ubicación'),
                        TextInput::make('price')
                            ->numeric()
                            ->required()
                            ->label('Precio'),
                        TextInput::make('rating')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(5)
                            ->label('Calificación'),
                        FileUpload::make('imgPath')
                            ->image()
                            ->disk('public')
                            ->directory('events')
                            ->imageEditor()
                            ->preserveFilenames()
                            ->label('Imagen'),
                    ])->columns(2),

                Section::make('Relaciones')
                    ->schema([
                        Select::make('category_id')
                            ->relationship('category', 'title')
                            ->required()
                            ->createOptionForm([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nombre'),
                            ])
                            ->label('Categoría'),
                        Select::make('brand_id')
                            ->relationship('brand', 'title')
                            ->required()
                            ->createOptionForm([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->label('Nombre'),
                            ])
                            ->label('Marca'),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('imgPath')
                    ->label('Imagen')
                    ->disk('public')
                    ->square()
                    ->defaultImageUrl(url('/images/placeholder.png')),
                TextColumn::make('title')
                    ->label('Título')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('location')
                    ->label('Ubicación')
                    ->searchable(),
                TextColumn::make('price')
                    ->label('Precio')
                    ->money('usd')
                    ->sortable(),
                TextColumn::make('rating')
                    ->label('Calificación')
                    ->sortable(),
                TextColumn::make('category.title')
                    ->label('Categoría')
                    ->searchable(),
                TextColumn::make('brand.title')
                    ->label('Marca')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'title')
                    ->label('Categoría'),
                Tables\Filters\SelectFilter::make('brand')
                    ->relationship('brand', 'title')
                    ->label('Marca'),
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
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['category', 'brand']);
    }
} 