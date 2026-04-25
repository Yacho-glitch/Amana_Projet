<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    protected $fillable = [
        'user_id',
        'code_envoi',
        'type_modification',
        'description',
        'statut'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
