import { useState } from "react";
import UtilisateursTable from "../components/utilisateurs/UtilisateursTable";

const MOCK_DATA = [
    { id: 1, nom: "Touimi",  prenom: "Rachid",  email: "rachid@amana.ma",  telephone: "0612345678", role: "Admin",  statut: "actif"   },
    { id: 2, nom: "Alaoui",  prenom: "Sara",    email: "sara@amana.ma",    telephone: "0698765432", role: "Client", statut: "actif"   },
    { id: 3, nom: "Bennani", prenom: "Youssef", email: "youssef@amana.ma", telephone: null,         role: "Client", statut: "inactif" },
    { id: 4, nom: "Chraibi", prenom: "Fatima",  email: "fatima@amana.ma",  telephone: "0654321987", role: "Client", statut: "actif"   },
    { id: 5, nom: "Idrissi", prenom: "Omar",    email: "omar@amana.ma",    telephone: "0677889900", role: "Admin",  statut: "actif"   }
]

const ITEMS_PER_PAGE = 10;

export default function ListeUtilisateurs() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(MOCK_DATA.length / ITEMS_PER_PAGE);
    const paginatedData = MOCK_DATA.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className=" flex flex-col gap-4">
            <p className="text-sm font-bold text-gray-700">
                {MOCK_DATA.length} Utilisateurs
            </p>
            <UtilisateursTable 
                data={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}