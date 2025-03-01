<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Traits\UseSlugAsKey;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasApiTokens, HasFactory, SoftDeletes, UseSlugAsKey;

    protected $table = "events";
    protected $fillable = [
        'slug',
        'title',
        'description',
        'location',
        'price',
        'rating',
        'imgPath',
        'category_id',
        'brand_id'
    ];

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model['slug'] = Str::random(12);
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function savedEvents(): HasMany
    {
        return $this->hasMany(SavedEvent::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
