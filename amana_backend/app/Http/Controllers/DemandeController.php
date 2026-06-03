<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class DemandeController extends Controller
{
    public function index(Request $request) {
        $user = $request->user();
        $query = Demande::with('user');

        if ($user->role === 'client') {
            $query->where('user_id', $user->id);
        }

        return response()->json($query->orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request) {
        $request->validate([
            'code_envoi' => 'required|string',
            'type_modification' => 'required|string',
            'description' => 'nullable|string'
        ]);

        $demande = Demande::create([
            'user_id'       => $request->user()->id,
            'code_envoi'    => $request->code_envoi,
            'type_modification' => $request->type_modification,
            'description'   => $request->description,
            'statut' => 'en_attente'
        ]);

        $admins = User::whereIn('role', ['admin', 'Admin'])->get();
        foreach ($admins as $admin) {
            Notification::create([
                'user_id' => $admin->id,
                'type' => 'new_demande',
                'message' => "Nouvelle demande de modification pour {$demande->code_envoi}",
                'data' => [
                    'demande_id' => $demande->id,
                    'code_envoi' => $demande->code_envoi,
                    'description' => $demande->description,
                    'type_modification' => $demande->type_modification,
                    'target_tab' => 'demandes-modification'
                ]
            ]);
        }

        return response()->json($demande, 201);
    }

    public function updateStatut(Request $request, $id) {
        $request->validate([
            'statut' => 'required|in:acceptee,refusee'
        ]);

        $demande = Demande::findOrFail($id);
        $demande->update(['statut' => $request->statut]);

        Notification::create([
            'user_id' => $demande->user_id,
            'type' => 'demande_status',
            'message' => "Votre demande pour {$demande->code_envoi} a été " . ($request->statut === 'acceptee' ? 'acceptée' : 'refusée'),
            'data' => [
                'demande_id' => $demande->id,
                'code_envoi' => $demande->code_envoi,
                'status' => $request->statut,
                'target_tab' => 'mes-demandes'
            ]
        ]);

        return response()->json($demande);
    }
}
