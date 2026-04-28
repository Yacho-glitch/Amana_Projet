<?php

namespace App\Http\Controllers;

use App\Models\Bordereau;
use Illuminate\Http\Request;

class BordereauController extends Controller
{
    public function index(Request $request) {
        $user = $request->user();

        $bordereaux = Bordereau::query()
            ->when($user->role === 'client', fn($q) => $q->where('user_id', $user->id))
            ->ofCode($request->code_envoi)
            ->ofStatut($request->statut)
            ->ofDateDepot($request->date_depot_start, $request->date_depot_end)
            ->ofDateStatut($request->date_statut_start, $request->date_statut_end)
            ->ofPaiement($request->paiement)
            ->ofDestination($request->destination)
            ->ofTelDest($request->tel_dest)
            ->orderBy('date_depot', 'desc')
            ->paginate($request->per_page ?? 10);

        return response()->json($bordereaux);
    }

    public function stats(Request $request) {
        $user = $request->user();

        $query = Bordereau::query()
            ->when($user->role === 'client', fn($q) => $q->where('user_id', $user->id));

        $total = (clone $query)->count();
        $totalCrbt = (clone $query)->sum('amount_crbt');

        $parStatut = (clone $query)
            ->selectRaw('dernier_statut, count(*) as count')
            ->groupBy('dernier_statut')
            ->get();

        $paye = (clone $query)->where('paye', true)->count();
        $impaye = (clone $query)->where('paye', false)->count();

        $parMois = (clone $query)
            ->selectRaw('DATE_FORMAT(date_depot, "%Y-%m") as mois, count(*) as total_envois, sum(amount_crbt) as total_crbt')
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        return response()->json([
            'total' => $total,
            'total_crbt' => $totalCrbt,
            'par_statut' => $parStatut,
            'paiements' => [
                'paye' => $paye,
                'impaye' => $impaye
            ],
            'par_mois' => $parMois
        ]);
    }

}
