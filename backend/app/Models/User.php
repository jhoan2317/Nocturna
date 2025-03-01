<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Traits\UseSlugAsKey;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, UseSlugAsKey;
    protected $table = "users";
    protected $fillable = [
        'slug',
        'name',
        'last_name',
        'email',
        'password',
        'birthday',
        'gender',
        'role',
        'active',
        'profile_id'
    ];

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model['slug'] = Str::random(12);
        });
    }

    protected $attributes = [
        'birthday' => '1970-01-01',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    public function savedEvents(): HasMany
    {
        return $this->hasMany(SavedEvent::class);
    }

}
