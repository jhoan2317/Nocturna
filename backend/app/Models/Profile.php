<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Traits\UseSlugAsKey;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profile extends Model
{
    use HasApiTokens, HasFactory, SoftDeletes, UseSlugAsKey;

    protected $table = "profiles";
    protected $fillable = [
        'slug',
        'profilePic'
    ];

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model['slug'] = Str::random(12);
        });
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
}


