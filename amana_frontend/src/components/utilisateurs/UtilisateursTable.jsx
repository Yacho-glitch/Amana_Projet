function StatusBadge({ statut }) {
    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full
            ${statut === "actif"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
            {statut === "actif" ? "Actif" : "Inactif"}
        </span>
    );
}

export default function UtilisateursTable({ data = [], currentPage, totalPages, onPageChange, onDelete }) {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="px-4 py-3 text-gray-400 font-semibold">Nom</th>
                            <th className="px-4 py-3 text-gray-400 font-semibold">Email</th>
                            <th className="px-4 py-3 text-gray-400 font-semibold">Téléphone</th>
                            <th className="px-4 py-3 text-gray-400 font-semibold">Rôle</th>
                            <th className="px-4 py-3 text-gray-400 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-12 text-gray-300 text-sm">
                                    Aucun utilisateur trouvé
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-700">{row.name}</td>
                                    <td className="px-4 py-3 text-gray-500">{row.email}</td>
                                    <td className="px-4 py-3 text-gray-500">{row.telephone || "—"}</td>
                                    <td className="px-4 py-3">
                                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                            {row.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => onDelete(row.id)}
                                            className="text-red-400 hover:text-red-600 transition-colors"
                                            title="Supprimer"
                                        >
                                            <i className="fa-solid fa-trash" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Page {currentPage} sur {totalPages}
                </p>
                <div className="flex gap-1">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30"
                    >
                        &laquo;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
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
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30"
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
}