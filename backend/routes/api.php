<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\PlacesController;
use App\Http\Controllers\RatingsController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\RestrictionsController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\SavedEventsController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ClientRequestController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Eventos
Route::apiResource('events', EventsController::class);
//Route::get('events/search/{text}', [EventsController::class, 'search']);
Route::get('places/{slug}/comments', [PlacesController::class, 'comments']);

// Lugares
Route::apiResource('places', PlacesController::class);
Route::get('places/search/{text}', [PlacesController::class, 'search']);
Route::get('places/{place}/events', [PlacesController::class, 'placeEvents']);

// Categorías
Route::apiResource('categories', CategoriesController::class);
Route::get('categories/{title}/events', [CategoriesController::class, 'categoryEvents']);

// Usuarios
Route::apiResource('users', UsersController::class)->only(['index', 'update']);
Route::post('users/login', [UsersController::class, 'login']);
Route::post('users/logout', [UsersController::class, 'logout']);
Route::post('users/register', [UsersController::class, 'register']);
Route::put('users/{user}/block', [UsersController::class, 'block']);

// Eventos Guardados
Route::apiResource('saved-events', SavedEventsController::class)->only(['index', 'store', 'destroy']);
Route::get('users/{user}/saved-events', [SavedEventsController::class, 'savedEventsUser']);

// Comentarios
Route::apiResource('comments', CommentsController::class)->only(['store']);

// Calificaciones
Route::apiResource('ratings', RatingsController::class)->only(['index', 'store', 'update', 'destroy']);
Route::get('events/{event}/ratings', [RatingsController::class, 'eventRatings']);
Route::get('users/{user}/ratings', [RatingsController::class, 'userRatings']);

// Restricciones
Route::apiResource('restrictions', RestrictionsController::class);
Route::get('events/{event}/restrictions', [RestrictionsController::class, 'eventRestrictions']);

// Suscripciones
Route::apiResource('subscriptions', SubscriptionController::class);

// Reseteo de Contraseña
Route::prefix('password-reset')->group(function () {
    Route::post('request', [PasswordResetController::class, 'sendResetLink']);
    Route::post('reset', [PasswordResetController::class, 'resetPassword']);
});

// Verificación de Autenticación
Route::get('check-auth', function () {
    return response()->json([
        'authenticated' => auth()->check() && auth()->user() !== null
    ]);
});

// Solicitudes de Cliente
Route::post('client-requests', [ClientRequestController::class, 'store']);
Route::get('client-requests', [ClientRequestController::class, 'index']);
Route::put('client-requests/{request}/approve', [ClientRequestController::class, 'approve']);
Route::put('client-requests/{request}/reject', [ClientRequestController::class, 'reject']);