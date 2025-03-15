<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Traits\UseSlugAsKey;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory, SoftDeletes, UseSlugAsKey;

    protected $table = "events";

    protected $fillable = [
        'slug',
        'place_id',
        'title',
        'capacity',
        'price',
        'description',
        'imgPath'
    ];

    protected $casts = [
        'price' => 'float',
    ];

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model['slug'] = Str::random(6) . '-' . Str::slug($model['title']);
        });
    }

    public function place(): BelongsTo
    {
        return $this->belongsTo(Place::class);
    }

    public function restrictions(): HasMany
    {
        return $this->hasMany(Restriction::class);
    }
}
