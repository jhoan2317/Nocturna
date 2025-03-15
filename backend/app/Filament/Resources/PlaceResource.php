<?php

namespace App\Filament\Resources;

use App\Models\Place;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\PlaceResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Database\Eloquent\Model;

class PlaceResource extends Resource
{
    protected static ?string $model = Place::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';

    protected static ?string $navigationGroup = 'Sitios Turísticos';

    protected static ?int $navigationSort = 2;

    public static function getNavigationLabel(): string
    {
        return 'Lugares';
    }

    public static function getNavigationTooltip(): string
    {
        return 'Gestionar lugares turísticos';
    }

    

    public static function getPermissionIdentifier(): string
    {
        return 'places';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Información del Lugar')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->label('Nombre'),
                        MarkdownEditor::make('description')
                            ->required()
                            ->label('Descripción'),
                        TextInput::make('location')
                            ->required()
                            ->label('Ubicación'),
                        FileUpload::make('imgPath')
                            ->image()
                            ->disk('public')
                            ->directory('places')
                            ->imageEditor()
                            ->preserveFilenames()
                            ->label('Imagen'),
                        Forms\Components\Hidden::make('user_id')
                            ->default(fn () => auth()->id()),
                    ])->columns(2),
                
                Section::make('Categorización')
                    ->schema([
                        Select::make('category_id')
                            ->relationship('category', 'title')
                            ->required()
                            ->label('Categoría')
                    ])->columns(2)
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
                TextColumn::make('user.name')
                    ->label('Usuario')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.role')
                    ->label('Rol')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Lugar')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('description')
                    ->label('Descripción')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('location')
                    ->label('Ubicación')
                    ->searchable(),
                TextColumn::make('category.title')
                    ->label('Categoría')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('events_count')
                    ->label('Eventos')
                    ->counts('events')
                    ->sortable(),
                TextColumn::make('comments_count')
                    ->label('Comentarios')
                    ->counts('comments')
                    ->sortable(),
                TextColumn::make('ratings_count')
                    ->label('Calificaciones')
                    ->counts('ratings')
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
                    ->modalHeading('Eliminar lugar')
                    ->modalDescription('¿Está seguro que desea eliminar este lugar? Esta acción es reversible.')
                    ->modalSubmitActionLabel('Sí, eliminar'),
                Tables\Actions\ForceDeleteAction::make()
                    ->slideOver()
                    ->icon('heroicon-o-trash')
                    ->color('danger')
                    ->modalHeading('Eliminar permanentemente')
                    ->modalDescription('¿Está seguro que desea eliminar permanentemente este lugar? Esta acción no se puede deshacer.')
                    ->modalSubmitActionLabel('Sí, eliminar permanentemente'),
                Tables\Actions\RestoreAction::make()
                    ->icon('heroicon-o-arrow-uturn-left')
                    ->color('success')
                    ->tooltip('Restaurar')
                    ->successNotificationTitle('Lugar restaurado exitosamente'),
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
            'index' => Pages\ListPlaces::route('/'),
            'create' => Pages\CreatePlace::route('/create'),
            'edit' => Pages\EditPlace::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
            
        // Si el usuario es cliente, solo ve sus propios lugares
        if (auth()->check()) {
            $user = auth()->user();
            
            // Verificar directamente el rol para evitar dependencia de method_exists
            if (isset($user->role) && $user->role === 'client') {
                $query->where('user_id', $user->id);
            } elseif (method_exists($user, 'hasRole') && $user->hasRole('client')) {
                $query->where('user_id', $user->id);
            }
        }
        
        return $query;
    }

    protected static function checkPermission(string $permission): bool
    {
        return auth()->check();
        // En producción, descomentar la siguiente línea y comentar la anterior:
        // return auth()->check() && auth()->user()->hasPermissionTo($permission);
    }

    public static function shouldRegisterNavigation(): bool
    {
        return static::checkPermission('view_any_places');
    }

    public static function canCreate(): bool
    {
        return auth()->user()->can('create_places');
    }

    public static function canEdit(Model $record): bool
    {
        return auth()->user()->can('update_places');
    }

    public static function canDelete(Model $record): bool
    {
        return auth()->user()->can('delete_places');
    }

    public static function canViewAny(): bool
    {
        return auth()->user()->can('view_any_places');
    }

    public static function canView(Model $record): bool
    {
        return auth()->user()->can('view_places');
    }
} 