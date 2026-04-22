import { useState } from "react";
import Amana from "../assets/amana.jpg";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    }

    async function handleSubmit() {
        if (!form.email || !form.password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setLoading(true);
        try {
            // API call will go here later
            console.log("Login with: ", form);
        } catch (err) {
            setError("Email ou mot de passe incorrect.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img 
                        src={Amana}
                        alt="Amana"
                        className="h-14 object-contain"
                        onError={(e) => { e.target.style.display = "none"; }}
                    />
                </div>

                <h2 className="text-lg font-bold text-gray-800 mb-1 text-center">
                    Bienvenue
                </h2>
                <p className="text-xs text-gray-400 text-center mb-6">
                    Connectez-vous à votre compte
                </p>

                {/* Email */}
                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-xs text-gray-400 font-medium">Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border:border-orange-400 transition-colors"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1 mb-6">
                    <label className="text-xs text-gray-400 font-medium">Mot de passe</label>
                    <input 
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-xs text-red-600 font-semibold">
                            <i className="fa-solid fa-circle-exclamation mr-2"/>
                            {error}
                        </p>
                    </div>
                )}

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                >
                    {loading
                        ? <i className="fa-solid fa-spinner fa-spin mr-2"/>
                        : <i className="fa-solid fa-right-to-bracket mr-2"/>
                    }
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </div>
        </div>
    );
}