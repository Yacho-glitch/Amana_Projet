import { useState, useEffect } from "react";
import api from "../api/apiService";
import UtilisateursTable from "../components/utilisateurs/UtilisateursTable";

export default function ListeUtilisateurs() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setLoading(true);
        try {
            const response = await api.get("/users");
            setData(response.data);
        } catch (err) {
            console.log("Erreur utilisateurs:", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
        try {
            await api.delete(`/users/${id}`);
            fetchUsers()
        } catch (err) {
            console.error("Erreur suppression", err);
        }
    }

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const paginatedData = data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <i className="fa-solid fa-spinner fa-spin text-orange-500 text-2xl"/>
            </div>
        )
    }

    return (
        <div className=" flex flex-col gap-4">
            <p className="text-sm font-bold text-gray-700">
                {data.length} Utilisateurs
            </p>
            <UtilisateursTable 
                data={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onDelete={handleDelete}
            />
        </div>
    );
}