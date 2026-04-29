import { useState, useEffect } from "react";
import api from "../api/apiService";

function StatutBadge({ statut }) {
    const styles = {
        en_attente: "bg-yellow-100 text-yellow-700",
        acceptee:   "bg-green-100 text-green-700",
        refusee:    "bg-red-100 text-red-700",
    };
    const labels = {
        en_attente: "En attente",
        acceptee:   "Acceptée",
        refusee:    "Refusée",
    };
    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[statut]}`}>
            {labels[statut]}
        </span>
    );
}

export default function MesDemandesModification() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        codeEnvoi: "",
        typeModification: "",
        description: "",
    });

    useEffect(() => {
        fetchDemandes();
    }, []);

    async function fetchDemandes() {
        setLoading(true);
        try {
            const response = await api.get("/demandes");
            setData(response.data);
        } catch (err) {
            console.error("Erreur demandes:", err);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit() {
        if (!form.codeEnvoi || !form.typeModification) return;
        setSubmitting(true);
        try {
            await api.post("/demandes", {
                code_envoi:         form.codeEnvoi,
                type_modification:  form.typeModification,
                description:        form.description,
            });
            setSubmitted(true);
            setShowForm(false);
            setForm({ codeEnvoi: "", typeModification: "", description: "" });
            fetchDemandes();
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            console.error("Erreur soumission:", err);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <i className="fa-solid fa-spinner fa-spin text-orange-500 text-2xl" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-700">
                    {data.length} Demandes
                </p>
                <button
                    onClick={() => setShowForm((v) => !v)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                    <i className="fa-solid fa-plus mr-2" />
                    Nouvelle demande
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                    <p className="text-sm font-semibold text-gray-700">
                        Nouvelle demande de modification
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400 font-medium">Code envoi</label>
                            <input
                                name="codeEnvoi"
                                value={form.codeEnvoi}
                                onChange={handleChange}
                                placeholder="QB228184565MA"
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 bg-white"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400 font-medium">Type de modification</label>
                            <select
                                name="typeModification"
                                value={form.typeModification}
                                onChange={handleChange}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 bg-white"
                            >
                                <option value="">Sélectionner</option>
                                <option value="Changement de destination">Changement de destination</option>
                                <option value="Changement de destinataire">Changement de destinataire</option>
                                <option value="Changement d'adresse">Changement d'adresse</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 col-span-2">
                            <label className="text-xs text-gray-400 font-medium">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Décrivez votre demande..."
                                rows={3}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 bg-white resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-xs text-gray-500 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                            {submitting ? <i className="fa-solid fa-spinner fa-spin mr-2" /> : null}
                            Soumettre
                        </button>
                    </div>
                </div>
            )}

            {/* Success message */}
            {submitted && (
                <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-600 font-semibold">
                        <i className="fa-solid fa-circle-check mr-2" />
                        Demande soumise avec succès !
                    </p>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-4 py-3 text-gray-400 font-semibold">Code envoi</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Type de modification</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Date demande</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-12 text-gray-300 text-sm">
                                        Aucune demande trouvée
                                    </td>
                                </tr>
                            ) : (
                                data.map((row) => (
                                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-semibold text-gray-700">{row.code_envoi}</td>
                                        <td className="px-4 py-3 text-gray-500">{row.type_modification}</td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(row.created_at).toLocaleDateString("fr-FR")}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatutBadge statut={row.statut} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}