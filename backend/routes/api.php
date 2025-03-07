<?php

use App\Http\Controllers\Api\PasswordResetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\Brandscontroller;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\SavedEventsController;
use App\Http\Controllers\SubscriptionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/events', [EventsController::class, 'index']);
Route::post('/events', [EventsController::class, 'store']);
Route::get('/brands', [Brandscontroller::class, 'index']);
Route::put('/brands/{id}', [BrandsController::class, 'update']);
Route::get('/brands/{title}', [Brandscontroller::class, 'brandEvents']);
Route::get('/categories', [CategoriesController::class, 'index']);
Route::get('/categories/{title}', [CategoriesController::class, 'categoryEvents']);
Route::post('/categories', [CategoriesController::class, 'store']); 
Route::put('/categories/{id}', [CategoriesController::class, 'update']); 
Route::delete('/categories/{id}', [CategoriesController::class, 'destroy']); 
Route::get('/events/search/{text}', [EventsController::class, 'search']);
Route::get('/events/show/{id}', [EventsController::class, 'show']);
Route::put('/events/{id}', [EventsController::class, 'update']);  
Route::get('/users', [UsersController::class, 'index']);

// Preferencias
Route::get('/savedEvents/{id_user}', [SavedEventsController::class, 'savedEventsUser']);
Route::post('/savedEvents/store', [SavedEventsController::class, 'store']);
Route::delete('/savedEvents/destroy/{event_id}/{user_id}', [SavedEventsController::class, 'destroy']);

// Registro && Inicio de sesión && Cerrar sesión
Route::post('/users/login', [UsersController::class, 'login']);
Route::post('/users/logout', [UsersController::class, 'logout']);
Route::post('/users/register', [UsersController::class, 'register']);

// Comentarios
Route::get('/comments/{event_id}', [EventsController::class, 'comments']);
Route:: post('/comments/store', [CommentsController::class, 'store']);

// Dashboard
Route::put('/users/block/{user}', [UsersController::class, 'block']);
Route::delete('/events/destroy/{event}', [EventsController::class, 'destroy']);

// Cuenta
Route::put('/users/update/{user}/{name}', [UsersController::class, 'update']);

// Estadísticas
Route::get('/statistics', [StatisticsController::class, 'index']);

// Suscripción
Route::post('/subscribe', [SubscriptionController::class, 'store']);

Route::prefix('password-reset')->group(function () {
    Route::post('/request', [PasswordResetController::class, 'sendResetLink']);
    Route::post('/verify', [PasswordResetController::class, 'verifyToken']);
    Route::post('/reset', [PasswordResetController::class, 'resetPassword']);
});