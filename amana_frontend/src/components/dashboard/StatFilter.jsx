import { useState } from "react";

export default function StatFilter({ onFilter }) {
    const [filters, setFilters] = useState({
        codeEnvoi: "",
        telDest: "",
        dateDepotStart: "",
        dateDepotEnd: "",
        dateStatutStart: "",
        dateStatutEnd: "",
        statut: "",
        paiement: "",
        destination: "",
        crbt: "",
        datePaiementStart: "",
        datePaiementEnd: ""
    });

    function handleChange(e) {
        setFilters({...filters, [e.target.name]: e.target.value});
    }

    function handleSubmit() {
        onFilter(filters);
    }

    return (
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            {/* Row 1 */}
            <div className="grid grid-cols-4 gap-3 mb-3">
                {/* Code envoi */}
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-3 gap-2">
                    <input
                        name="codeEnvoi"
                        value={filters.codeEnvoi}
                        onChange={handleChange}
                        placeholder="Code envoi" 
                        className="text-xs text-gray-500 outline-none w-full" 
                    />
                    <i className="fa-solid fa-magnifying-glass text-gray-300 text-xs" />
                </div>
                {/* Date depot */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">Date dépôt</label>
                    <div className="flex items-center gap-1">
                        <input 
                            type="date"
                            name="dateDepotStart"
                            value={filters.dateDepotStart}
                            onChange={handleChange}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none w-full"
                        />
                        <span className="text-gray-300 text-xs">-</span>
                        <input 
                            type="date"
                            name="dateDepotEnd"
                            value={filters.dateDepotEnd}
                            onChange={handleChange}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none w-full"
                        />
                    </div>
                </div>
                {/* Tout Statut */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">Statut</label>
                    <select 
                        name="statut" 
                        value={filters.statut}
                        onChange={handleChange}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none text-gray-500"
                    >
                        <option value="">Tout statut</option>
                        <option value="liv">Envoi livré</option>
                        <option value="aff">En cours de livraison</option>
                        <option value="trn">En transit</option>
                    </select>
                </div>
                {/* Paiement */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">Paiement</label>
                    <select 
                        name="paiement" 
                        value={filters.paiement}
                        onChange={handleChange}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none text-gray-500"
                    >
                        <option value="">Paiement</option>
                        <option value="paye">Payé</option>
                        <option value="impaye">Impayé</option>
                    </select>
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-4 gap-3">
                {/* Tel destinataire */}
                <div className="flex items-center border border-gray-200 rounded-lg px-2 py-2 gap-2">
                    <input
                        name="telDest"
                        value={filters.telDest}
                        onChange={handleChange}
                        placeholder="Tel destinataire" 
                        className="text-xs text-gray-500 outline-none w-full" 
                    />
                    <i className="fa-solid fa-magnifying-glass text-gray-300 text-xs"/>
                </div>
                {/* Date statut */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">Date statut</label>
                    <div className="flex items-center gap-1">
                        <input 
                            type="date"
                            name="dateStatutStart"
                            value={filters.dateStatutStart}
                            onChange={handleChange}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none w-full" 
                        />
                        <span className="text-gray-300 text-xs">-</span>
                        <input 
                            type="date"
                            name="dateStatutEnd"
                            value={filters.dateStatutEnd}
                            onChange={handleChange}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none w-full" 
                        />
                    </div>
                </div>
                {/* Destination */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">Destination</label>
                    <select 
                        name="destination" 
                        value={filters.destination}
                        onChange={handleChange}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none text-gray-500"
                    >
                        <option value="">Toute destination</option>
                        <option value="sale">Salé</option>
                        <option value="casablanca">Casablanca</option>
                        <option value="rabat">Rabat</option>
                    </select>
                </div>

                {/* CRBT */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">CRBT</label>
                    <select 
                        name="crbt" 
                        value={filters.crbt}
                        onChange={handleChange}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none text-gray-500"
                    >
                        <option value="">CRBT</option>
                        <option value="avec">Avec CRBT</option>
                        <option value="sans">Sans CRBT</option>
                    </select>
                </div>
            </div>

            {/* Summary + button de recherche */}
            <div className="flex items-center justify-between mt-4">
                <p className="text-sm font-bold text-gray-700">82 Colis / 449 310,00 MAD</p>
                <button
                    onClick={handleSubmit}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                    <i className="fa-solid fa-magnifying-glass mr-2"/>
                    Recherche
                </button>
            </div>
        </div>
    );
}