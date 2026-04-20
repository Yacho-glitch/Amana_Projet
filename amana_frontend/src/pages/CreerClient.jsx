import { useState } from "react";

export default function CreerClient() {
    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        ville: "",
        codePostal: ""
    });

    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit() {
        console.log("Client data: ", form);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    }

    return (
        <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-gray-700 mb-6">
                Créer un client
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Nom */}
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

                {/* Prénom */}
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

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@exemple.ma"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    />
                </div>

                {/* Téléphone */}
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

                {/* Adresse */}
                <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-xs text-gray-400 font-medium">Adresse</label>
                    <input
                        name="adresse"
                        value={form.adresse}
                        onChange={handleChange}
                        placeholder="Adresse complète"
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors"
                    />
                </div>

                {/* Ville */}
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

                {/* Code postal */}
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

            {/* Success message */}
            {submitted && (
                <div className="mt-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-600 font-semibold">
                        <i className="fa-solid fa-circle-check mr-2"/>
                        Client créé avec succès !
                    </p>
                </div>
            )}

            {/* Submit */}
            <div className="mt-6">
                <button 
                    onClick={handleSubmit}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                    <i className="fa-solid fa-plus mr-2"/>
                    Créer le client
                </button>
            </div>
        </div>
    )
}