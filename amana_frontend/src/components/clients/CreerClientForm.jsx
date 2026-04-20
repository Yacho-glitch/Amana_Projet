import { useState } from "react";

export default function CreerClientForm() {
    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        ville: "",
        codePostal: ""
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Client a créer: ", form);
    }

return (
    <div className="max-w-2xl mx-auto">
        <h2 className="text-sm font-bold text-gray-700 mb-6">
            Créer un nouveau client
        </h2>

        <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 font-medium">Nom</label>
                    <input
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        placeholder="Nom"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors" 
                    />
                </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 font-medium">Prénom</label>
                    <input
                        name="prenom"
                        value={form.prenom}
                        onChange={handleChange}
                        placeholder="Prénom"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors" 
                    />
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 font-medium">Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
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
                {/* Row 3 */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 font-medium">Adresse</label>
                    <input 
                        name="adresse"
                        value={form.adresse}
                        onChange={handleChange}
                        placeholder="Adresse compléte"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    />
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium">Ville</label>
                        <input 
                            name="ville"
                            value={form.ville}
                            onChange={handleChange}
                            placeholder="Ville"
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 font-medium">Code postal</label>
                        <input 
                            name="codePostal"
                            value={form.codePostal}
                            onChange={handleChange}
                            placeholder="Code postal" 
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors" 
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-2">
                    <button 
                        onClick={handleSubmit}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
                    >
                        <i className="fa-solid fa-plus mr-2"/>
                        Créer le client
                    </button>
                    <button
                        onClick={() => setForm({ nom: "", prenom: "", email: "", telephone: "", adresse: "", ville: "", codePostal: "" })} 
                        className="border border-gray-200 text-gray-500 text-sm font-semibold px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>
        </div>
    </div>
);
}