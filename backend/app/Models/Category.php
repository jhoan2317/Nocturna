<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Traits\UseSlugAsKey;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasApiTokens, HasFactory, SoftDeletes, UseSlugAsKey;
    protected $table  = 'categories';
    protected $fillable = [
        'slug',
        'title'
    ];
    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model['slug'] = Str::random(12);
        });
    }
    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
