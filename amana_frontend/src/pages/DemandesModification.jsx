import { useState } from "react";
import MesDemandesModification from './MesDemandesModification';

const MOCK_DATA = [
    { id: 1, client: "Rachid Touimi", codeEnvoi: "QB228184565MA", typeModification: "Changement de destination", dateDepot: "2025-12-08", statut: "en_attente" },
    { id: 2, client: "Sara Alaoui", codeEnvoi: "QB228183922MA", typeModification: "Changement de destinataire", dateDepot: "2025-12-06", statut: "en_attente" },
    { id: 3, client: "Youssef Bennani", codeEnvoi: "QB229489245MA", typeModification: "Changement de d'adresse", dateDepot: "2025-12-04", statut: "acceptee" },
    { id: 4, client: "Fatima Chraibi", codeEnvoi: "QB228272004MA", typeModification: "Changement de destination", dateDepot: "2025-12-03", statut: "refusee" },
];

const ITEMS_PER_PAGE = 10;

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
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(MOCK_DATA);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const paginatedData = data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    function handleAction(id, action) {
        setData((prev) => 
            prev.map((row) => 
                row.id === id ? { ...row, statut: action } : row
            )
        );
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
                            {paginatedData.map((row) => (
                                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-semibold text-gray-700">{row.client}</td>
                                    <td className="px-4 py-3 text-gray-500">{row.codeEnvoi}</td>
                                    <td className="px-4 py-3 text-gray-500">{row.typeModification}</td>
                                    <td className="px-4 py-3 text-gray-500">{row.dateDepot}</td>
                                    <td className="px-4 py-3"><StatutBadge statut={row.statut}/></td>
                                    <td className="px-4 py-3">
                                        {row.statut === "en_attente" ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleAction(row.id, "acceptee")}
                                                    className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors"
                                                >
                                                    <i className="fa-solid fa-check mr-1"/>
                                                    Accepter
                                                </button>
                                                <button
                                                    onClick={() => handleAction(row.id, "refusee")}
                                                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
                                                >
                                                    <i className="fa-solid fa-xmark mr-1"/>
                                                    Refuser
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-300 text-xs">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">Page {currentPage} sur {totalPages}</p>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30"
                        >
                            &laquo;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 text-xs rounded-lg border transition-colors
                                    ${page === currentPage
                                        ? "bg-orange-500 text-white border-orange-500"
                                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30"
                        >
                            &raquo;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}