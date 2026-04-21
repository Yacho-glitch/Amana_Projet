import { useState } from "react";

const MOCK_DATA = [
    {
        id: 1,
        codeEnvoi: "QB228184565MA",
        typeModification: "Changement de destination",
        dateDepot: "2025-12-08",
        statut: "en_attente"
    },
    {
        id: 2,
        codeEnvoi: "QB228183922MA",
        typeModification: "Changement de destinataire",
        dateDepot: "2025-12-06",
        statut: "acceptee"
    },
    {
        id: 3,
        codeEnvoi: "QB2294892445MA",
        typeModification: "Changement d'adresse",
        dateDepot: "2025-12-04",
        statut: "refusee"
    }
];

const ITMES_PER_PAGE = 10;

function StatusBadge({ statut }) {
    const styles = {
        en_attente: "bg-yellow-100 text-yellow-700",
        acceptee: "bg-green-100 text-green-700",
        refusee: "bg-red-100 text-red-700"
    };

    const labels = {
        en_attente: "En attente",
        acceptee: "Acceptée",
        refusee: "Refusée"
    };

    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[statut]}`}>
            {labels[statut]}
        </span>
    );
}

export default function MesDemandesModification() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        codeEnvoi: "",
        typeModification: "",
        description: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const totalPages = Math.ceil(MOCK_DATA.length / ITMES_PER_PAGE);
    const paginatedData = MOCK_DATA.slice(
        (currentPage - 1) * ITMES_PER_PAGE,
        currentPage * ITMES_PER_PAGE
    );

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit() {
        if (!form.codeEnvoi || !form.typeModification) return;
        console.log("Nouvelle demande: ", form);
        setSubmitted(true);
        setShowForm(false);
        setForm({ codeEnvoi: "", typeModification: "", description: "" });
        setTimeout(() => setSubmitted(false), 3000);
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-700">
                    {MOCK_DATA.length} Demandes
                </p>
                <button
                    onClick={() => setShowForm((v) => !v)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                    <i className="fa-solid fa-plus mr-2"/>
                    Nouvelle demande
                </button>
            </div>

            {/* New request form */}
            {showForm && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                    <p className="text-sm font-semibold text-gray-700">Nouvelle demande de modification</p>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400 font-medium">Code envoi</label>
                            <input 
                                name="codeEnvoi"
                                value={form.codeEnvoi}
                                onChange={handleChange}
                                placeholder="QB228184565MA"
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors bg-white"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400 font-medium">Type de modification</label>
                            <select
                                name="typeModification"
                                value={form.typeModification}
                                onChange={handleChange}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors bg-white"
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
                                row={3}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors bg-white resize-none"
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
                            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
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
                            <tr className="border border-gray-100">
                                <th className="px-4 py-3 text-gray-400 font-semibold">Code envoi</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Type de modification</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Date demande</th>
                                <th className="px-4 py-3 text-gray-400 font-semibold">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row) => (
                                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-semibold text-gray-700">{row.codeEnvoi}</td>
                                    <td className="px-4 py-3 text-gray-500">{row.typeModification}</td>
                                    <td className="px-4 py-3 text-gray-500">{row.dateDepot}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge statut={row.statut}/>
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
                        {Array.from({ length: totalPages}, (_, i) => i + 1).map((page) => (
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