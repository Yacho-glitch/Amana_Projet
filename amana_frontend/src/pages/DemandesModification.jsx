import { useState, useEffect } from "react";
import api from "../api/apiService";
import MesDemandesModification from './MesDemandesModification';

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

export default function DemandesModification() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDemandes();
    }, []);

    async function fetchDemandes() {
        setLoading(true);
        try {
            const response = await api.get("/demandes");
            setData(response.data);
        } catch (err) {
            console.log("Erreur demandes:", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleAction(id, action) {
        try {
            await api.patch(`/demandes/${id}/statut`, { statut: action });
            fetchDemandes();
        } catch (err) {
            console.error("Erreur action:", err);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <i className="fa-solid fa-spinner fa-spin text-orange-500 text-2xl"/>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm font-bold text-gray-700">
                {data.length} Demandes
            </p>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-4 py-3 text-gray-400 font-semibold">Client</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Code Envoi</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Type de modification</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Date demande</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Statut</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-gray-300 text-sm">
                                        Aucun demande trouvée
                                    </td>
                                </tr>
                            ) : (
                                data.map((row) => (
                                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-semibold text-gray-700">
                                            {row.user?.name || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">{row.code_envoi}</td>
                                        <td className="px-4 py-3 text-gray-500">{row.type_modification}</td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(row.created_at).toLocaleDateString("fr-FR")}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge statut={row.statut} />
                                        </td>
                                        <td className="px-4 py-3">
                                            {row.statut === "en_attente" ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleAction(row.id, "acceptee")}
                                                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors"
                                                    >
                                                        <i className="fa-solid fa-check mr-1" />
                                                        Accepter
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(row.id, "refusee")}
                                                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
                                                    >
                                                        <i className="fa-solid fa-xmark mr-1" />
                                                        Refuser
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-300 text-xs">—</span>
                                            )}
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