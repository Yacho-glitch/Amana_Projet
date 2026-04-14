import StatCard from "../components/dashboard/StatCard";
import Send from "../assets/send.png";
import Box from "../assets/box.png";
import Dirham from "../assets/dirham.jpg";
import { ListLinks } from "../components/layout/ListLinks";

const listItems = [
    { 
      label: "Mes statistiques",
      to: "/"
    },
    { 
      label: "Mes envois",
      to: "/envois"
    },
    { 
      label: "Mes demandes", 
      to: "/mes-demandes"
    },
    {
      label: "Demandes de modification", 
      to: "/demandes"
    },
    { 
      label: "Créer un client",
      to: "/creer-client"
    },
    { 
      label: "Créer un utilisateur",
      to: "/creer-utilisateur"
    },
    { 
      label: "Liste d'utilisateurs",
      to: "/utilisateurs"
    }
];

export default function Dashboard() {
    // const [isClicked, setIsClicked] = useState(false);

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
                <div>
                    <ListLinks 
                        // check={isClicked} 
                        links={listItems}    
                    />
                </div>
            </div>
            <div className="bg-white mt-1">
                
            </div>
        </div>
    );
} 