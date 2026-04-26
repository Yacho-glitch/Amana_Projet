<?php

namespace App\Http\Controllers;

use App\Models\Demande;
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

        return response()->json($demande, 201);
    }

    public function updateStatut(Request $request, $id) {
        $request->validate([
            'statut' => 'required|in:acceptee,refusee'
        ]);

        $demande = Demande::findOrFail($id);
        $demande->update(['statut' => $request->statut]);

        return response()->json($demande);
    }
}
