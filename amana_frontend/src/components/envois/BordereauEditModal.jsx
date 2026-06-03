import { useEffect, useState } from "react";
import api from "../../api/apiService";

const STATUS_OPTIONS = [
    { value: "trn", label: "En transit" },
    { value: "aff", label: "En cours de livraison" },
    { value: "liv", label: "Envoi livré" }
];

export default function BordereauEditModal({ bordereau, onClose, onSaved }) {
    const [form, setForm] = useState({
        code_bordereau: bordereau.code_bordereau || "",
        dernier_statut: bordereau.dernier_statut || "trn",
        dest_nom: bordereau.dest_nom || "",
        dest_adress1: bordereau.dest_adress1 || "",
        libville: bordereau.libville || "",
        tel_dest: bordereau.tel_dest || "",
        amount_crbt: bordereau.amount_crbt ?? "",
        date_depot: bordereau.date_depot ? bordereau.date_depot.split("T")[0] : "",
        paye: bordereau.paye || false,
        date_paiement: bordereau.date_paiement ? bordereau.date_paiement.split("T")[0] : ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setForm({
            code_bordereau: bordereau.code_bordereau || "",
            dernier_statut: bordereau.dernier_statut || "trn",
            dest_nom: bordereau.dest_nom || "",
            dest_adress1: bordereau.dest_adress1 || "",
            libville: bordereau.libville || "",
            tel_dest: bordereau.tel_dest || "",
            amount_crbt: bordereau.amount_crbt ?? "",
            date_depot: bordereau.date_depot ? bordereau.date_depot.split("T")[0] : "",
            paye: bordereau.paye || false,
            date_paiement: bordereau.date_paiement ? bordereau.date_paiement.split("T")[0] : ""
        });
    }, [bordereau]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    async function handleSubmit() {
        setLoading(true);
        setError(null);
        try {
            const payload = {
                ...form,
                paye: form.paye,
                date_paiement: form.date_paiement ? form.date_paiement : null,
                date_depot: form.date_depot ? form.date_depot : null,
                amount_crbt: form.amount_crbt ? parseFloat(form.amount_crbt) : null
            };
            let response;
            if (bordereau?.id) {
                response = await api.patch(`/bordereaux/${bordereau.id}`, payload);
            } else {
                // create new bordereau
                response = await api.post(`/bordereaux`, {
                    ...payload,
                    user_id: bordereau.user_id
                });
            }
            onSaved(response.data);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'enregistrement du bordereau.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-6">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                            <h2 className="text-lg font-semibold text-gray-900">{bordereau?.id ? 'Modifier le bordereau' : 'Nouveau bordereau'}</h2>
                            <p className="text-xs text-gray-500">{bordereau?.code_bordereau || ''}</p>
                        </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                        <label className="text-xs text-gray-500 uppercase tracking-wide">Code envoi</label>
                        <input name="code_bordereau" value={form.code_bordereau} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none" placeholder="QB..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-wide">Statut</label>
                        <select name="dernier_statut" value={form.dernier_statut} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none">
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-wide">Destinataire</label>
                        <input name="dest_nom" value={form.dest_nom} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none" />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <label className="text-xs text-gray-500 uppercase tracking-wide">Adresse</label>
                        <input name="dest_adress1" value={form.dest_adress1} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-wide">Destination</label>
                        <input name="libville" value={form.libville} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-wide">Montant CRBT (MAD)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            name="amount_crbt"
                            value={form.amount_crbt}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-wide">Téléphone destinataire</label>
                        <input name="tel_dest" value={form.tel_dest} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none" />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="paye" name="paye" checked={form.paye} onChange={handleChange} className="h-4 w-4 text-orange-500 border-gray-300 rounded" />
                            <label htmlFor="paye" className="text-sm text-gray-700">Payé</label>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wide">Date dépôt</label>
                                <input
                                    type="date"
                                    name="date_depot"
                                    value={form.date_depot}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wide">Date paiement</label>
                                <input
                                    type="date"
                                    name="date_paiement"
                                    value={form.date_paiement}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="px-6 pb-4 text-sm text-red-600">{error}</div>
                )}

                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                    <button onClick={onClose} className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Annuler</button>
                    <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 disabled:opacity-50">
                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </div>
            </div>
        </div>
    );
}
