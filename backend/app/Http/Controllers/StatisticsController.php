<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Brand;
use App\Models\Event;
use App\Models\Category;

class StatisticsController extends Controller
{
    public function index()
    {
        $usersCount = User::count();
        $brandsCount = Brand::count();
        $categoriesCount = Category::count();
        $eventsCount = Event::count();

        return response()->json([
            'users' => $usersCount,
            'brands' => $brandsCount,
            'categories' => $categoriesCount,
            'events' => $eventsCount,
        ]);
    }
}