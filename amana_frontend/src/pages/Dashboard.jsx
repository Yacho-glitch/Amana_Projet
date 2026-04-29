import StatCard from "../components/dashboard/StatCard";
import { ListLinks } from "../components/layout/ListLinks";
import StatFilter from "../components/dashboard/StatFilter";
import DonutChart from './../components/charts/DonutChart';
import GaugeChart from "../components/charts/GaugeChart";
import LineChart from "../components/charts/LineChart";
import MoroccoMap from "../components/charts/MoroccoMap";
import MesEnvois from "./MesEnvois";
import Send from "../assets/send.png";
import Box from "../assets/box.png";
import Dirham from "../assets/dirham.jpg";
import ListeUtilisateurs from "./ListeUtilisateurs";
import CreerClient from "./CreerClient";
import CreerUtilisateur from "./CreerUtilisateur";
import MesDemandesModification from "./MesDemandesModification";
import DemandesModification from "./DemandesModification"
import { useTab } from "../context/TabContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import api from "../api/apiService";

const statutColors = ["#FF8904", "#894B0A", "#51A2FF"];

const envoisColors = ["#FF8904", "#894B0A", "#51A2FF"];

export default function Dashboard() {
    const { activeTab, setActiveTab } = useTab();
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [envoisFilters, setEnvoisFilters] = useState({});
    const [bordereaux, setBordereaux] = useState([])
    
    useEffect(() => {
        fetchStats({});
    }, []);
    
    async function fetchStats(filters = {}) {
    setLoading(true);
    try {
        const [statsResponse, bordereauxResponse] = await Promise.all([
            api.get("/bordereaux/stats", {
                params: {
                    code_envoi:        filters.codeEnvoi        || undefined,
                    tel_dest:          filters.telDest           || undefined,
                    date_depot_start:  filters.dateDepotStart    || undefined,
                    date_depot_end:    filters.dateDepotEnd      || undefined,
                    date_statut_start: filters.dateStatutStart   || undefined,
                    date_statut_end:   filters.dateStatutEnd     || undefined,
                    statut:            filters.statut            || undefined,
                    paiement:          filters.paiement          || undefined,
                    destination:       filters.destination       || undefined,
                }
            }),
            api.get("/bordereaux", {
                params: {
                    per_page: 100,
                    statut:   filters.statut      || undefined,
                    paiement: filters.paiement    || undefined,
                    destination: filters.destination || undefined,
                }
            })
        ]);

        setStats(statsResponse.data);
        setBordereaux(bordereauxResponse.data.data);
    } catch (err) {
        console.log("Erreur stats:", err);
    } finally {
        setLoading(false);
    }
}

    const statutData = stats?.par_statut?.map((s) => ({
        name: s.dernier_statut === "liv" ? "Envoi livré"
            : s.dernier_statut === "aff" ? "En cours de livraison"
            : "En transit",
        value: parseFloat(((s.count / (stats.total || 1)) * 100).toFixed(2))
    })) || [];

    const envoisData = stats?.par_statut?.map((s) => ({
        name: s.dernier_statut === "liv" ? "Livré"
            : s.dernier_statut === "aff" ? "En cours"
            : "Retourné",
        value: parseFloat(((s.count / (stats.total || 1)) * 100).toFixed(2))
    })) || [];
    
    const lineData = stats?.par_mois?.map((m) => ({
        month: m.mois,
        crbt: parseFloat(m.total_crbt),
        envois: parseInt(m.total_envois)
    })) || [];

    const payePercent = stats
        ? parseFloat(((stats.paiements.paye / (stats.total || 1)) * 100).toFixed(2))
        : 0;

    const allTabs = [
        { id: "mes-statistiques", label: "Mes statistiques", roles: ["admin", "client"] },
        { id: "mes-envois", label: "Mes envois", roles: ["admin", "client"] },
        { id: "mes-demandes", label: "Mes demandes de modification", roles: ["admin", "client"] },
        { id: "demandes-modification", label: "Demandes de modification", roles: ["admin"] },
        { id: "creer-client", label: "Créer un client", roles: ["admin"] },
        { id: "creer-utilisateur", label: "Créer un utilisateur", roles: ["admin"] },
        { id: "liste-utilisateurs", label: "Liste d'utilisateurs", roles: ["admin"] },
    ]

    // filter tabs based on user role
    const listItems = allTabs.filter((tab) => 
        tab.roles.includes(user?.role)
    );

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-4 mb-4">
                <StatCard 
                    label="NB. Colis affiché"
                    value={stats?.total ?? "-"}
                    icon={Send}
                    color="border-orange-400"
                />
                <StatCard 
                    label="Total envois de la période"
                    value={stats?.total ?? "-"}
                    icon={Box}
                    color="border-yellow-800"
                />
                <StatCard 
                    label="Total CRBT"
                    value={stats ? `${parseFloat(stats.total_crbt).toLocaleString("fr-FR")} MAD` : "-"}
                    icon={Dirham}
                    color="border-blue-400"
                />
            </div>

            <ListLinks 
                links={listItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="bg-white rounded-xl p-4">
                {activeTab === "mes-statistiques" && (
                    <div className="flex flex-col">
                        <StatFilter 
                            onFilter={(filters) => { fetchStats(filters)}} 
                            total={stats?.total ?? 0}
                            totalCrbt={stats?.total_crbt ?? 0}
                        />
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <i className="fa-solid fa-spinner fa-spin text-orange-500 text-2xl" />
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <DonutChart 
                                        title="Détail des statuts"
                                        data={statutData}
                                        colors={statutColors}
                                    />
                                    <GaugeChart value={payePercent} />
                                    <DonutChart 
                                        title="Statut des envois"
                                        data={envoisData}
                                        colors={envoisColors}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <LineChart data={lineData} />
                                    <MoroccoMap data={bordereaux}/>
                                </div>
                            </>
                        )}   
                    </div>
                )}

                {activeTab === "mes-envois" && (
                    <div className="flex flex-col gap-4">
                        <StatFilter 
                            onFilter={(filters) => setEnvoisFilters(filters)}
                            total={stats?.total ?? 0}
                            totalCrbt={stats?.total_crbt ?? 0}    
                        />
                        <MesEnvois filters={envoisFilters}/>
                    </div>
                )} 

                {activeTab === "mes-demandes" && <MesDemandesModification />}
                {activeTab === "demandes-modification" && <DemandesModification />}
                {activeTab === "creer-client" && <CreerClient />}
                {activeTab === "creer-utilisateur" && <CreerUtilisateur />}
                {activeTab === "liste-utilisateurs" && <ListeUtilisateurs />}
            </div>
        </div>
    );
} 