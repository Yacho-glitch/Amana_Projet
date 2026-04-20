const columns = [
    { key: "codeBordereau", label: "Code envoi" },
    { key: "dateDepot", label: "Date dépôt" },
    { key: "libville", label: "Destination" },
    { key: "libelle", label: "Statut" },
    { key: "dateLastStatus", label: "Date statut" },
    { key: "amountCrbt", label: "CRBT" },
    { key: "destNom", label: "Destinataire" },
    { key: "testDest", label: "Tel destinataire" },
    { key: "destAdress1", label: "Adresse" },
    { key: "datePaiement", label: "Date paiement" }
];

function formatDate(dateStr) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });
}

function formatCrbt(amount) {
    if (!amount) return "-";
    return `${amount.toLocaleString("fr-FR")} MAD`;
}

function StatusBadge({ status }) {
    const styles = {
        liv: "bg-green-100 text-green-700",
        aff: "bg-yellow-100 text-yellow-700",
        trn: "bg-gray-100 text-gray-600"
    };

    const labels = {
        liv: "Envoi livré",
        aff: "En cours de livraison",
        trn: "En transit"
    };
    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[status] || "bg-gray-100 text-gray-500"}`}>
            {labels[status] || status}
        </span>
    );
}

function rowColor(status) {
    const colors = {
        liv: "bg-green-50",
        aff: "bg-yellow-50",
        trn: "bg-gray-50"
    };

    return colors[status] || "";
}

export default function EnvoisTable({ data = [], currentPage, totalPages, onPageChange }) {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="px-3 py-3">
                                <input type="checkbox" />
                            </th>
                            {columns.map((col) => (
                                <th 
                                    key={col.key}
                                    className="px-3 py-3 text-gray-400 font-semibold whitespace-nowrap"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-center py-12 text-gray-300 text-sm"
                                >
                                    Aucun envoi trouvé
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={row.idBordereau}
                                    className={`border-b border-gray-50 hover:opacity-80 transition-opacity ${rowColor(row.dernierStatut)}`}
                                >
                                    <td className="px-3 py-3">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-3 py-3 font-semibold text-gray-700 whitespace-nowrap">
                                        {row.codeBordereau}
                                    </td>
                                    <td className="px-3 py-3 text-gray-500 whitespace-nowrap">
                                        {formatDate(row.dateDepot)}
                                    </td>
                                    <td className="px-3 py-3 text-gray-500 whitespace-nowrap">
                                        {row.libville}
                                    </td>
                                    <td className="px-3 py-3">
                                        <StatusBadge status={row.dernierStatut}/>
                                    </td>
                                    <td className="px-3 py-3 text-gray-500 whitespace-nowrap">
                                        {formatDate(row.dateLastStatus)}
                                    </td>
                                    <td className="px-3 py-3 text-gray-600 font-medium whitespace-nowrap">
                                        {formatCrbt(row.amountCrbt)}
                                    </td>
                                    <td className="px-3 py-3 text-gray-500">
                                        {row.destNom || "-"}
                                    </td>
                                    <td className="px-3 py-3 text-gray-500">
                                        {row.telDest || "-"}
                                    </td>
                                    <td className="px-3 py-3 text-gray-500">
                                        {row.destAresse1 || "-"}
                                    </td>
                                    <td className="px-3 py-3 text-gray-500 whitespace-nowrap">
                                        {formatDate(row.datePaiement)}
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
                    Page  {currentPage} sur {totalPages}
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