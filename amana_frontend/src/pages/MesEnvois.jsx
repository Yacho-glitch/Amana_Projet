import { useState } from "react";
import EnvoisTable from "../components/envois/EnvoisTable";

const MOCK_DATA = [
    {
        idBordereau: 65416935,
        codeBordereau: "QB228184565MA",
        dateDepot: "2025-12-08T17:46:44.000+00:00",
        dernierStatut: "liv",
        libelle: "Envoi livré",
        dateLastStatus: "2025-12-09T12:10:11.000+00:00",
        destNom: "-- --",
        libville: "SALE",
        amountCrbt: 6650,
        telDest: null,
        destAdress1: null,
        datePaiement: null,
    },
    {
        idBordereau: 65354571,
        codeBordereau: "QB228183922MA",
        dateDepot: "2025-12-04T16:49:09.000+00:00",
        dernierStatut: "aff",
        libelle: "En cours de livraison",
        dateLastStatus: "2025-12-09T10:17:22.000+00:00",
        destNom: "-- --",
        libville: "DAKHLA OUED EDDAHAB",
        amountCrbt: 5400,
        telDest: null,
        destAdress1: null,
        datePaiement: null
    },
    {
        idBordereau: 65354572,
        codeBordereau: "QB229489245MA",
        dateDepot: "2025-12-08T17:46:00.000+00:00",
        dernierStatut: "trn",
        libelle: "En transit",
        dateLastStatus: "2025-12-08T19:31:00.000+00:00",
        destNom: "-- --",
        libville: "KENITRA",
        amountCrbt: 9000,
        telDest: null,
        destAdress1: null,
        datePaiement: null,
    }
];

const ITEMS_PER_PAGE = 10;

export default function MesEnvois() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(MOCK_DATA.length / ITEMS_PER_PAGE);
    const paginatedData = MOCK_DATA.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm font-bold text-gray-700">
                {MOCK_DATA.length} Colis / 449 310,00 MAD
            </p>
            <EnvoisTable 
                data={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}
