import StatCard from "../components/dashboard/StatCard";
import Send from "../assets/send.png";
import Box from "../assets/box.png";
import Dirham from "../assets/dirham.jpg";
import { ListLinks } from "../components/layout/ListLinks";
import { useState } from "react";
import StatFilter from "../components/dashboard/StatFilter";
import DonutChart from './../components/charts/DonutChart';
import GaugeChart from "../components/charts/GaugeChart";

const statutData = [
    { name: "En transit", value: 4.88 },
    { name: "En cours de livraison", value: 1.22 },
    { name: "Envoi livré", value: 93.90 }
]

const statutColors = ["#FF8904", "#894B0A", "#51A2FF"];

const envoisData = [
    { name: "En cours", value: 4.88 },
    { name: "Retourné", value: 1.22 },
    { name: "Livré", value: 93.90 }
];

const envoisColors = ["#FF8904", "#894B0A", "#51A2FF"];

const listItems = [
    { id: "mes-statistiques", label: "Mes statistiques" },
    { id: "mes-envois", label: "Mes envois" },
    { id: "mes-demandes", label: "Mes demandes" },
    { id: "demandes-modification", label: "Demandes de modification" },
    { id: "creer-client", label: "Créer un client" },
    { id: "creer-utilisateur", label: "Créer un utilisateur" },
    { id: "liste-utilisateurs", label: "Liste d'utilisateurs" }
];

export default function Dashboard() {
    const [activeTab, setActiveTap] = useState("mes-statistiques");

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <StatCard 
                        label="NB. Colis affiché"
                        value={82}
                        icon={Send}
                        color="border-orange-400"
                    />
                    <StatCard 
                        label="Total envois de la période"
                        value={82}
                        icon={Box}
                        color="border-yellow-800"
                    />
                    <StatCard 
                        label="Total CRBT"
                        value="449 310,00 MAD"
                        icon={Dirham}
                        color="border-blue-400"
                    />
                </div>
                <ListLinks 
                    links={listItems}
                    activeTab={activeTab}
                    setActiveTab={setActiveTap}    
                />
            
                <div className="bg-white rounded-xl p-4">
                    {activeTab === "mes-statistiques" && <p>Mes statistiques content</p> }
                    {activeTab === "mes-envois" && <p>Mes envois content</p> }
                    {activeTab === "mes-demandes" && <p>Mes demandes content</p> }
                    {activeTab === "demandes-modification" && <p>Demandes de modification content</p> }
                    {activeTab === "creer-client" && <p>Créer un client content</p> }
                    {activeTab === "creer-utilisateur" && <p>Créer un utilisateur content</p> }
                    {activeTab === "liste-utilisateurs" && <p>Liste d'utilisateurs content</p> }

                    {(activeTab === "mes-statistiques" || activeTab === "mes-envois" ) && (
                        <div>
                            <StatFilter onFilter={(filters) => console.log(filters)}/>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <DonutChart 
                                    title="Détail des statuts"
                                    data={statutData}
                                    colors={statutColors}
                                />
                                <GaugeChart />
                                <DonutChart 
                                    title="Statut des envois"
                                    data={envoisData}
                                    colors={envoisColors}
                                />
                            </div>
                        </div>
                    )}
              
                </div>
            </div>
        </div>
    );
} 