<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'street',
        'neighborhood',
        'city',
        'province',
        'country',
        'address_type'
    ];

    public function enterprises() : HasMany
    {
        return $this->hasMany(Enterprise::class);
    }

    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class);
    }
}
