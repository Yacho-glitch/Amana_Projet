import { useState } from "react";
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
// import CreerClientForm from "../components/clients/CreerClientForm";
import CreerClient from "./CreerClient";
import CreerUtilisateur from "./CreerUtilisateur";


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
    const [activeTab, setActiveTab] = useState("mes-statistiques");

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

                {/* Tabs */}
                <ListLinks 
                    links={listItems}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}    
                />
            
                <div className="bg-white rounded-xl p-4">
                    {/* Placeholders — to be built */}
                    {activeTab === "mes-demandes" && <p>Mes demandes content</p> }
                    {activeTab === "demandes-modification" && <p>Demandes de modification content</p> }


                    {/* {(activeTab === "mes-statistiques" || activeTab === "mes-envois") && (
                        <div className="flex flex-col">
                                <StatFilter onFilter={(filters) => console.log(filters)}/>
                             <MesEnvois /> 
                                {activeTab === "mes-statistiques" && (
                                  <>
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
                                    <div className="grid grid-cols-2 mt-4">
                                        <LineChart />
                                        <MoroccoMap />
                                    </div>
                                  </>
                                )}
                                {activeTab === "mes-envois" && <MesEnvois />}
                        </div>
                    )}  */}


                         {/* Mes statistiques */}
                {activeTab === "mes-statistiques" && (
                    <div className="flex flex-col">
                        <StatFilter onFilter={(filters) => console.log(filters)} />
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
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <LineChart />
                            <MoroccoMap />
                        </div>
                    </div>
                )}

                {/* Mes envois */}
                {activeTab === "mes-envois" && (
                        <div className="flex flex-col gap-4">
                            <StatFilter onFilter={(filter) => console.log(filter)} />
                            <MesEnvois />
                        </div>
                    )
                }

                {activeTab === "liste-utilisateurs" && <ListeUtilisateurs /> }

                {activeTab === "creer-client" && <CreerClient /> }

                {activeTab === "creer-utilisateur" && <CreerUtilisateur /> }

              
                </div>
            </div>
         </div>
    );
} 