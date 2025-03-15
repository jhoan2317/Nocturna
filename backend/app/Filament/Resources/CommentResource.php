<?php

namespace App\Filament\Resources;

use App\Models\Comment;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\CommentResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Database\Eloquent\Model;

class CommentResource extends Resource
{
    protected static ?string $model = Comment::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-ellipsis';

    protected static ?string $navigationGroup = 'Sitios Turísticos';

    protected static ?string $navigationLabel = 'Comentarios';
    protected static ?int $navigationSort = 4;

    

    public static function getPermissionIdentifier(): string
    {
        return 'comments';
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()->can('view_any_comments');
    }

    public static function canCreate(): bool
    {
        return auth()->user()->can('create_comments');
    }

    public static function canEdit(Model $record): bool
    {
        return auth()->user()->can('update_comments');
    }

    public static function canDelete(Model $record): bool
    {
        return auth()->user()->can('delete_comments');
    }

    public static function canViewAny(): bool
    {
        return auth()->user()->can('view_any_comments');
    }

    public static function canView(Model $record): bool
    {
        return auth()->user()->can('view_comments');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Información del Comentario')
                    ->schema([
                        Textarea::make('text')
                            ->required()
                            ->label('Comentario'),
                        Select::make('user_id')
                            ->relationship('user', 'name')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->label('Usuario'),
                        Select::make('place_id')
                            ->relationship('place', 'title')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->label('Lugar'),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('text')
                    ->label('Comentario')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('user.name')
                    ->label('Usuario')
                    ->searchable(),
                TextColumn::make('place.title')
                    ->label('Lugar')
                    ->searchable(),
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
                Tables\Filters\SelectFilter::make('place')
                    ->relationship('place', 'title')
                    ->searchable()
                    ->preload()
                    ->label('Lugar'),
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
            'index' => Pages\ListComments::route('/'),
            'create' => Pages\CreateComment::route('/create'),
            'edit' => Pages\EditComment::route('/{record}/edit'),
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