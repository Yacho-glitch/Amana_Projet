<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bordereau extends Model
{
    protected $fillable = [
        'code_bordereau',
        'user_id',
        'date_depot',
        'poids_reel',
        'dernier_statut',
        'libelle',
        'date_last_status',
        'dest_nom',
        'dest_adress1',
        'dest_adress2',
        'libville',
        'amount_crbt',
        'paye',
        'date_paiement',
        'tel_dest',
        'tel_livreur'
    ];

    protected $casts = [
        'date_depot' => 'datetime',
        'date_last_status' => 'datetime',
        'date_paiement' => 'datetime',
        'paye' => 'boolean'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
