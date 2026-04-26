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

    public function scopeOfCode($query, $code) {
        if ($code) {
            $query->where('code_bordereau', 'like', '%' . $code . '%' );
        }
        return $query;
    }

    public function scopeOfStatut($query, $statut) {
        if ($statut) {
            $query->where('dernier_statut', $statut);
        }
        return $query;
    }

    public function scopeOfDateDepot($query, $start, $end) {
        if ($start) {
            $query->where('date_last_statut', '>=', $start);
        }
        if ($end) {
            $query->where('date_last_statut', '<=', $end);
        }
        return $query;
    }

    public function scopeOfPaiement($query, $paiement) {
        if ($paiement === 'paye') {
            $query->where('paye', true);
        } elseif ($paiement === 'impaye') {
            $query->where('paye', false);
        }
        return $query;
    }

    public function scopeOfDestination($query, $destination) {
        if ($destination) {
            $query->where('libville', 'like', '%' . $destination . '%');
        }
        return $query;
    }

    public function scopeOfTelDest($query, $tel) {
        if ($tel) {
            $query->where('tel_dest', 'like', '%' . $tel . '%');
        }
        return $query;
    }
}
