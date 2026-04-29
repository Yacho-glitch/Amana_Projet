import { useEffect, useState } from "react";
import EnvoisTable from "../components/envois/EnvoisTable";
import api from "../api/apiService";

export default function MesEnvois({ filters = {} }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalCrbt, setTotalCrbt] = useState(0);

    useEffect(() => {
        fetchEnvois(1);
        setCurrentPage(1);
    }, [filters]);

    useEffect(() => {
        fetchEnvois(currentPage);
    }, [currentPage]);

    async function fetchEnvois(page) {
        setLoading(true);
        try {
            const response = await api.get("/bordereaux", {
                params: { 
                    page,
                    per_page: 10, 
                    code_envoi: filters.codeEnvoi || undefined,
                    tel_dest: filters.telDest || undefined,
                    date_depot_start: filters.dateDepotStart || undefined,
                    date_depot_end: filters.dateDepotEnd || undefined,
                    date_statut_start: filters.dateStatutStart || undefined,
                    date_statut_end: filters.dateStatutEnd || undefined,
                    statut: filters.statut || undefined,
                    paiement: filters.paiement || undefined,
                    destination: filters.destination || undefined
                }
            });
            setData(response.data.data);
            setTotalPages(response.data.last_page);
            setTotal(response.data.total);
            setTotalCrbt(
                response.data.data.reduce((sum, b) => sum + parseFloat(b.amount_crbt), 0)
            );
        } catch (err) {
            console.error("Erreur lors du chargement des envois", err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <i className="fa-solid fa-spinner fa-spin text-orange-500 text-2xl" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm font-bold text-gray-700">
                {total} Colis / {totalCrbt.toLocaleString("fr-FR")} MAD
            </p>
            <EnvoisTable 
                data={data}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}
