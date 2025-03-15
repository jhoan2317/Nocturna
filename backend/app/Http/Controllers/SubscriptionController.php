<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Subscription\SubscriptionResource;
use App\Http\Requests\Subscription\StoreSubscriptionRequest;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the subscriptions.
     */
    public function index(): JsonResource
    {
        $subscriptions = Subscription::latest()->get();
        return SubscriptionResource::collection($subscriptions);
    }

    /**
     * Store a newly created subscription in storage.
     */
    public function store(StoreSubscriptionRequest $request): JsonResponse
    {
        $subscription = Subscription::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Suscripción creada exitosamente',
            'data' => new SubscriptionResource($subscription)
        ], 201);
    }

    /**
     * Display the specified subscription.
     */
    public function show(string $slug): JsonResource
    {
        $subscription = Subscription::where('slug', $slug)->firstOrFail();
        return new SubscriptionResource($subscription);
    }

    /**
     * Update the specified subscription in storage.
     */
    public function update(StoreSubscriptionRequest $request, string $slug): JsonResponse
    {
        $subscription = Subscription::where('slug', $slug)->firstOrFail();
        $subscription->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Suscripción actualizada exitosamente',
            'data' => new SubscriptionResource($subscription)
        ]);
    }

    /**
     * Remove the specified subscription from storage.
     */
    public function destroy(string $slug): JsonResponse
    {
        $subscription = Subscription::where('slug', $slug)->firstOrFail();
        $subscription->delete();

        return response()->json([
            'success' => true,
            'message' => 'Suscripción eliminada exitosamente'
        ]);
    }
}