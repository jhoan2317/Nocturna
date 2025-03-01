<?php

namespace App\Models;

use App\Traits\UseSlugAsKey;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SavedEvent extends Model
{
    use HasApiTokens, HasFactory, SoftDeletes, UseSlugAsKey;

    protected $table = "saved_events";
    protected $fillable = [
        'slug',
        'user_id',
        'event_id'
    ];
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

}
