<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() {
        return response()->json(User::all());
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'role' => 'required|in:admin,client',
            'telephone' => 'nullable|string',
            'adresse' => 'nullable|string',
            'ville' => 'nullable|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'ville' => $request->ville 
        ]);

        return response()->json($user, 201);
    }

    public function destroy($id) {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'Utilisateur supprime.']);
    }
}
