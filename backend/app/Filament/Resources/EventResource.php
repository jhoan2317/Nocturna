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
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Database\Eloquent\Model;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';

    protected static ?string $navigationGroup = 'Sitios Turísticos';

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

    protected static function checkPermission(string $permission): bool
    {
        return auth()->check();
        // En producción, descomentar la siguiente línea y comentar la anterior:
        // return auth()->check() && auth()->user()->hasPermissionTo($permission);
    }

    

    public static function getPermissionIdentifier(): string
    {
        return 'events';
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()->can('view_any_events');
    }

    public static function canCreate(): bool
    {
        return auth()->user()->can('create_events');
    }

    public static function canEdit(Model $record): bool
    {
        return auth()->user()->can('update_events');
    }

    public static function canDelete(Model $record): bool
    {
        return auth()->user()->can('delete_events');
    }

    public static function canViewAny(): bool
    {
        return auth()->user()->can('view_any_events');
    }

    public static function canView(Model $record): bool
    {
        return auth()->user()->can('view_events');
    }

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
                        TextInput::make('capacity')
                            ->required()
                            ->numeric()
                            ->minValue(1)
                            ->label('Capacidad'),
                        TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->label('Precio'),
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
                        Select::make('place_id')
                            ->relationship('place', 'title', function ($query) {
                                // Si es cliente, solo muestra sus propios lugares
                                if (auth()->check() && method_exists(auth()->user(), 'hasRole') && auth()->user()->hasRole('client')) {
                                    return $query->where('user_id', auth()->id());
                                }
                                return $query;
                            })
                            ->required()
                            ->label('Lugar'),
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
                TextColumn::make('description')
                    ->label('Descripción')
                    ->limit(50)
                    ->searchable()
                    ->sortable(),
                TextColumn::make('capacity')
                    ->label('Capacidad')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('price')
                    ->label('Precio')
                    ->money('COP')
                    ->sortable(),
                TextColumn::make('place.title')
                    ->label('Lugar')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('restrictions.title')
                    ->label('Restricciones')
                    ->counts('restrictions')
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
                Tables\Actions\EditAction::make()
                    ->icon('heroicon-o-pencil-square')
                    ->color('primary'),
                Tables\Actions\DeleteAction::make()
                    ->slideOver()
                    ->icon('heroicon-o-trash')
                    ->color('danger')
                    ->modalHeading('Eliminar evento')
                    ->modalDescription('¿Está seguro que desea eliminar este evento? Esta acción es reversible.')
                    ->modalSubmitActionLabel('Sí, eliminar'),
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
        $query = parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
            
        // Si el usuario es cliente, solo ve eventos de sus propios lugares
        if (auth()->check()) {
            $user = auth()->user();
            
            // Verificar si el usuario es cliente por el campo role
            if (isset($user->role) && $user->role === 'client') {
                // Usar whereHas que funciona bien con Eloquent
                $query->whereHas('place', function (Builder $placeQuery) use ($user) {
                    $placeQuery->where('user_id', $user->id);
                });
            } 
            // Enfoque alternativo (respaldo)
            elseif (method_exists($user, 'hasRole') && $user->hasRole('client')) {
                $query->whereHas('place', function (Builder $placeQuery) use ($user) {
                    $placeQuery->where('user_id', $user->id);
                });
            }
        }
        
        return $query;
    }
} 