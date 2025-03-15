<?php

namespace App\Filament\Resources;

use App\Models\Restriction;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\IconColumn;
use Filament\Forms\Components\MarkdownEditor;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\RestrictionResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Database\Eloquent\Model;

class RestrictionResource extends Resource
{
    protected static ?string $model = Restriction::class;

    protected static ?string $navigationIcon = 'heroicon-o-shield-exclamation';

    protected static ?string $navigationGroup = 'Sitios Turísticos';

    protected static ?int $navigationSort = 3;

    public static function getNavigationLabel(): string
    {
        return 'Restricciones';
    }

    public static function getNavigationTooltip(): string
    {
        return 'Gestionar restricciones de eventos';
    }

    public static function getPermissionPrefixes(): array
    {
        return [
            'view',
            'view_any',
            'create',
            'update',
            'delete',
            'approve',
            'reject'
        ];
    }

    public static function getPermissionIdentifier(): string
    {
        return 'restrictions';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('event_id')
                    ->relationship('event', 'title', function ($query) {
                        // Si es cliente, solo muestra eventos de sus propios lugares
                        if (auth()->check() && method_exists(auth()->user(), 'hasRole') && auth()->user()->hasRole('client')) {
                            return $query->whereHas('place', function ($placeQuery) {
                                $placeQuery->where('user_id', auth()->id());
                            });
                        }
                        return $query;
                    })
                    ->required()
                    ->label('Evento'),
                TextInput::make('title')
                    ->required()
                    ->label('Tipo'),
                TextInput::make('title')
                    ->required()
                    ->label('Título'),
                MarkdownEditor::make('description')
                    ->required()
                    ->label('Descripción'),
                Toggle::make('is_mandatory')
                    ->required()
                    ->label('¿Es obligatorio?')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('event.title')
                    ->label('Evento')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Tipo')
                    ->searchable()
                    ->sortable(),
                IconColumn::make('is_mandatory')
                    ->label('Obligatorio')
                    ->boolean()
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
                Tables\Actions\ForceDeleteAction::make()
                    ->slideOver()
                    ->icon('heroicon-o-trash')
                    ->color('danger')
                    ->modalHeading('Eliminar permanentemente')
                    ->modalDescription('¿Está seguro que desea eliminar permanentemente esta restricción? Esta acción no se puede deshacer.')
                    ->modalSubmitActionLabel('Sí, eliminar permanentemente'),
                Tables\Actions\RestoreAction::make()
                    ->icon('heroicon-o-arrow-uturn-left')
                    ->color('success')
                    ->tooltip('Restaurar')
                    ->successNotificationTitle('Restricción restaurada exitosamente'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
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
            'index' => Pages\ListRestrictions::route('/'),
            'create' => Pages\CreateRestriction::route('/create'),
            'edit' => Pages\EditRestriction::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
            
        // Si el usuario es cliente, solo ve restricciones de eventos de sus propios lugares
        if (auth()->check()) {
            $user = auth()->user();
            
            // Verificar si el usuario es cliente
            if (isset($user->role) && $user->role === 'client') {
                // Filtrar por lugares del usuario
                $query->whereHas('event', function (Builder $eventQuery) use ($user) {
                    $eventQuery->whereHas('place', function (Builder $placeQuery) use ($user) {
                        $placeQuery->where('user_id', $user->id);
                    });
                });
            }
        }
        
        return $query;
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()->can('view_any_restrictions');
    }

    public static function canCreate(): bool
    {
        return auth()->user()->can('create_restrictions');
    }

    public static function canEdit(Model $record): bool
    {
        return auth()->user()->can('update_restrictions');
    }

    public static function canDelete(Model $record): bool
    {
        return auth()->user()->can('delete_restrictions');
    }

    public static function canViewAny(): bool
    {
        return auth()->user()->can('view_any_restrictions');
    }

    public static function canView(Model $record): bool
    {
        return auth()->user()->can('view_restrictions');
    }
} 