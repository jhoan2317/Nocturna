<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Traits\UseSlugAsKey;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasApiTokens, HasFactory, SoftDeletes, UseSlugAsKey;
    protected $table = "comments";
    protected $fillable = [
        'slug',
        'text',
        'user_id',
        'event_id'
    ];

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model['slug'] = Str::random(12);
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
