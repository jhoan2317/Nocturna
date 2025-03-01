<?php

namespace App\Traits;

trait UseSlugAsKey
{
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
