<?php

namespace App\Http\Controllers;

use App\Models\Bordereau;
use App\Models\Notification;
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
            ->when($user->role === 'client', fn($q) => $q->where('user_id', $user->id))
            ->ofCode($request->code_envoi)
            ->ofStatut($request->statut)
            ->ofDateDepot($request->date_depot_start, $request->date_depot_end)
            ->ofDateStatut($request->date_statut_start, $request->date_statut_end)
            ->ofPaiement($request->paiement)
            ->ofDestination($request->destination)
            ->ofTelDest($request->tel_dest);
            
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

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'code_bordereau' => 'nullable|string|unique:bordereaux,code_bordereau',
            'date_depot' => 'nullable|date',
            'poids_reel' => 'nullable|numeric',
            'dernier_statut' => 'nullable|in:liv,aff,trn',
            'dest_nom' => 'nullable|string|max:255',
            'dest_adress1' => 'nullable|string|max:255',
            'libville' => 'nullable|string|max:255',
            'tel_dest' => 'nullable|string|max:255',
            'amount_crbt' => 'nullable|numeric',
            'paye' => 'nullable|boolean',
            'date_paiement' => 'nullable|date'
        ]);

        $code = $validated['code_bordereau'] ?? ('QB' . strtoupper(uniqid()));

        $bordereau = Bordereau::create(array_merge($validated, [
            'code_bordereau' => $code,
            'paye' => $validated['paye'] ?? false
        ]));

        return response()->json($bordereau, 201);
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $bordereau = Bordereau::findOrFail($id);
        $validated = $request->validate([
            'dernier_statut' => 'required|in:liv,aff,trn',
            'dest_nom' => 'required|string|max:255',
            'dest_adress1' => 'nullable|string|max:255',
            'libville' => 'nullable|string|max:255',
            'tel_dest' => 'nullable|string|max:255',
            'paye' => 'required|boolean',
            'date_paiement' => 'nullable|date'
        ]);

        $bordereau->fill($validated);
        $statusLabels = [
            'liv' => 'Envoi livré',
            'aff' => 'En cours de livraison',
            'trn' => 'En transit'
        ];
        $bordereau->libelle = $statusLabels[$validated['dernier_statut']] ?? $bordereau->libelle;

        if ($bordereau->isDirty('dernier_statut')) {
            $bordereau->date_last_status = now();
        }

        $bordereau->save();

        Notification::create([
            'user_id' => $bordereau->user_id,
            'type' => 'bordereau_updated',
            'message' => "Le colis {$bordereau->code_bordereau} a été mis à jour.",
            'data' => [
                'bordereau_id' => $bordereau->id,
                'code_bordereau' => $bordereau->code_bordereau,
                'target_tab' => 'mes-envois'
            ]
        ]);

        return response()->json($bordereau);
    }
}
