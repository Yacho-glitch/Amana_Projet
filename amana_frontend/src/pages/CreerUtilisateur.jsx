import { useState } from "react";
import api from "../api/apiService";

export default function CreerUtilisateur() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmerMotDePasse: "",
        role: "",
        telephone: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    }

    async function handleSubmit() {
        if (!form.name || !form.email || !form.role || !form.password) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        if (form.password !== form.confirmerMotDePasse) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (form.password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        setLoading(true);
        try {
            await api.post("/users", {
                name:      form.name,
                email:     form.email,
                password:  form.password,
                role:      form.role,
                telephone: form.telephone,
            });
            setSubmitted(true);
            setForm({ name: "", email: "", password: "", confirmerMotDePasse: "", role: "", telephone: "" });
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-gray-700 mb-6">Créer un utilisateur</h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-xs text-gray-400 font-medium">
                        Nom complet <span className="text-red-400">*</span>
                    </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nom complet"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 font-medium">
                        Email <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@exemple.ma"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 font-medium">Téléphone</label>
                    <input
                        name="telephone"
                        value={form.telephone}
                        onChange={handleChange}
                        placeholder="06XXXXXXXX"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-xs text-gray-400 font-medium">
                        Rôle <span className="text-red-400">*</span>
                    </label>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    >
                        <option value="">Sélectionner un rôle</option>
                        <option value="admin">Admin</option>
                        <option value="client">Client</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 font-medium">
                        Mot de passe <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Min. 8 caractères"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 font-medium">
                        Confirmer mot de passe <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="password"
                        name="confirmerMotDePasse"
                        value={form.confirmerMotDePasse}
                        onChange={handleChange}
                        placeholder="Répéter le mot de passe"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    />
                </div>
            </div>

            {error && (
                <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-600 font-semibold">
                        <i className="fa-solid fa-circle-exclamation mr-2" />
                        {error}
                    </p>
                </div>
            )}

            {submitted && (
                <div className="mt-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-600 font-semibold">
                        <i className="fa-solid fa-circle-check mr-2" />
                        Utilisateur créé avec succès !
                    </p>
                </div>
            )}

            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                    {loading
                        ? <i className="fa-solid fa-spinner fa-spin mr-2" />
                        : <i className="fa-solid fa-plus mr-2" />
                    }
                    {loading ? "Création..." : "Créer l'utilisateur"}
                </button>
            </div>
        </div>
    );
}