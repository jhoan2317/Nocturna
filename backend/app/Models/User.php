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
    protected $table = "users"; // NNOMBRE DE LA TABLA
    protected $fillable = [ // PASAR LOS NOMBRES DE LOS ATRIBUTOS DE LA TABLA PORQUE CON ESLLOS SE INTERACTUA EN EL CONTROLADOR
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

    public static function boot()// SE GENERA EL SLUG AUTOMATICAMENTE CON 12 CARACTERES
    {
        parent::boot();
        self::creating(function ($model) {
            $model['slug'] = Str::random(12);
        });
    }

    protected $attributes = [ // EL ATRIBUTO CUMPLEAÑOS SE DEBE GENERAR CON AA/MM/DD
        'birthday' => '1970-01-01',
    ];

    protected $hidden = [// TANTO LOS ATRIBUTOS COMO CONTRASEÑA Y TOKEN NO SON VISIBLES SE GENERA ***
        'password',
        'remember_token',
    ];

    protected $casts = [/// VERIFICA QUE SEA TIPO FECHA Y HORA
        'email_verified_at' => 'datetime',
    ];

    public function profile(): BelongsTo //LA RELACIO QUE TIENE LA TABLA USUARIOS CON PERFIL QUE ES GUARDAR UNA FOTO DE PERFIL
    {
        return $this->belongsTo(Profile::class);
    }

    public function savedEvents(): HasMany // LA RELACION QE TIENE GUARDAREVENTOS CON LA TABLA USUARIS QUE PUEDE SER QUE UN USUARIO GUARDE VRIOS EVENTOS
    {
        return $this->hasMany(SavedEvent::class);
    }

}
