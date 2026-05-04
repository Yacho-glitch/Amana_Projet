<?php

namespace Database\Seeders;

use App\Models\Bordereau;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BordereauSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bordereau::truncate();

        $client = User::where('role', 'client')->first();

        $bordereaux = [
            [
                'code_bordereau'   => 'QB228184565MA',
                'user_id'          => $client->id,
                'date_depot'       => '2025-12-08 17:46:44',
                'poids_reel'       => 0.48,
                'dernier_statut'   => 'liv',
                'libelle'          => 'Envoi livré',
                'date_last_status' => '2025-12-09 12:10:11',
                'dest_nom'         => 'John Doe',
                'dest_adress1'     => 'Rue Hassan II',
                'libville'         => 'SALE',
                'amount_crbt'      => 6650,
                'paye'             => true,
                'date_paiement'    => '2025-12-10 10:00:00',
                'tel_dest'         => '0629548466',
            ],
            [
                'code_bordereau'   => 'QB228183922MA',
                'user_id'          => $client->id,
                'date_depot'       => '2025-12-04 16:49:09',
                'poids_reel'       => 0.52,
                'dernier_statut'   => 'aff',
                'libelle'          => 'En cours de livraison',
                'date_last_status' => '2025-12-09 10:17:22',
                'dest_nom'         => 'Jane Doe',
                'dest_adress1'     => 'Avenue Mohammed V',
                'libville'         => 'DAKHLA OUED EDDAHAB',
                'amount_crbt'      => 5400,
                'paye'             => false,
                'tel_dest'         => '0629548466',
            ],
            [
                'code_bordereau'   => 'QB229489245MA',
                'user_id'          => $client->id,
                'date_depot'       => '2025-12-08 17:46:00',
                'poids_reel'       => 0.30,
                'dernier_statut'   => 'trn',
                'libelle'          => 'En transit',
                'date_last_status' => '2025-12-08 19:31:00',
                'dest_nom'         => 'Ahmed Alami',
                'dest_adress1'     => 'Rue Allal Ben Abdellah',
                'libville'         => 'KENITRA',
                'amount_crbt'      => 9000,
                'paye'             => false,
                'tel_dest'         => '0629548466',
            ],
            [
                'code_bordereau'   => 'QB228272004MA',
                'user_id'          => $client->id,
                'date_depot'       => '2025-12-08 17:58:00',
                'poids_reel'       => 0.60,
                'dernier_statut'   => 'trn',
                'libelle'          => 'En transit',
                'date_last_status' => '2025-12-08 19:19:00',
                'dest_nom'         => 'Sara Bennani',
                'dest_adress1'     => 'Boulevard Zerktouni',
                'libville'         => 'LAAYOUNE',
                'amount_crbt'      => 10050,
                'paye'             => false,
                'tel_dest'         => '0629548466',
            ],
            [
                'code_bordereau'   => 'QB338184525MA',
                'user_id'          => $client->id,
                'date_depot'       => '2025-12-08 17:58:00',
                'poids_reel'       => 0.25,
                'dernier_statut'   => 'trn',
                'libelle'          => 'En transit',
                'date_last_status' => '2025-12-08 19:14:00',
                'dest_nom'         => 'Youssef Chraibi',
                'dest_adress1'     => 'Rue Ibn Battouta',
                'libville'         => 'TINEJDAD',
                'amount_crbt'      => 3150,
                'paye'             => false,
                'tel_dest'         => '0629548466',
            ],
        ['code_bordereau' => 'QB268184551MA', 'user_id' => $client->id, 'date_depot' => '2025-12-08 17:58:00', 'poids_reel' => 0.40, 'dernier_statut' => 'trn', 'libelle' => 'En transit',           'date_last_status' => '2025-12-08 19:09:00', 'dest_nom' => 'Karim Idrissi',   'dest_adress1' => 'Rue Moulay Ismail',       'libville' => 'GUELMIM',            'amount_crbt' => 6750,  'paye' => false, 'date_paiement' => null,               'tel_dest' => '0629548466'],
        ['code_bordereau' => 'QB207930157MA', 'user_id' => $client->id, 'date_depot' => '2025-11-08 17:48:00', 'poids_reel' => 0.55, 'dernier_statut' => 'liv', 'libelle' => 'Envoi livré',           'date_last_status' => '2025-11-13 15:44:00', 'dest_nom' => 'Fatima Zahra',    'dest_adress1' => 'Avenue Hassan II',        'libville' => 'KHOURIBGA',          'amount_crbt' => 6000,  'paye' => true,  'date_paiement' => '2025-11-18 00:00:00', 'tel_dest' => '0629548466'],
        ['code_bordereau' => 'QB208133718MA', 'user_id' => $client->id, 'date_depot' => '2025-11-08 17:16:00', 'poids_reel' => 0.70, 'dernier_statut' => 'liv', 'libelle' => 'Envoi livré',           'date_last_status' => '2025-11-13 15:22:00', 'dest_nom' => 'Omar Benali',     'dest_adress1' => 'Rue des FAR',             'libville' => 'TINEJDAD',           'amount_crbt' => 8300,  'paye' => true,  'date_paiement' => '2025-11-14 00:00:00', 'tel_dest' => '0629548466'],
        ['code_bordereau' => 'QB207930165MA', 'user_id' => $client->id, 'date_depot' => '2025-11-08 17:48:00', 'poids_reel' => 0.35, 'dernier_statut' => 'liv', 'libelle' => 'Envoi livré',           'date_last_status' => '2025-11-13 13:37:00', 'dest_nom' => 'Nadia Tazi',      'dest_adress1' => 'Boulevard Zerktouni',     'libville' => 'TANGER',             'amount_crbt' => 6950,  'paye' => true,  'date_paiement' => '2025-11-15 00:00:00', 'tel_dest' => '0629548466'],
        ['code_bordereau' => 'QB207930171MA', 'user_id' => $client->id, 'date_depot' => '2025-11-08 16:56:00', 'poids_reel' => 0.45, 'dernier_statut' => 'liv', 'libelle' => 'Envoi livré',           'date_last_status' => '2025-11-13 10:33:00', 'dest_nom' => 'Hassan Berrada',  'dest_adress1' => 'Rue Imam Malik',          'libville' => 'CASABLANCA',         'amount_crbt' => 5340,  'paye' => true,  'date_paiement' => '2025-11-15 00:00:00', 'tel_dest' => '0629548466'],
        ['code_bordereau' => 'QB207930180MA', 'user_id' => $client->id, 'date_depot' => '2025-11-09 10:00:00', 'poids_reel' => 0.60, 'dernier_statut' => 'aff', 'libelle' => 'En cours de livraison','date_last_status' => '2025-11-14 08:00:00', 'dest_nom' => 'Laila Mansouri',  'dest_adress1' => 'Avenue Al Massira',       'libville' => 'AGADIR',             'amount_crbt' => 7200,  'paye' => false, 'date_paiement' => null,               'tel_dest' => '0629548466'],
        ['code_bordereau' => 'QB207930191MA', 'user_id' => $client->id, 'date_depot' => '2025-11-10 11:00:00', 'poids_reel' => 0.50, 'dernier_statut' => 'trn', 'libelle' => 'En transit',           'date_last_status' => '2025-11-10 15:00:00', 'dest_nom' => 'Rachid Bennis',   'dest_adress1' => 'Rue Allal El Fassi',      'libville' => 'FES',                'amount_crbt' => 4500,  'paye' => false, 'date_paiement' => null,               'tel_dest' => '0629548466'],
        ];

        foreach($bordereaux as $bordereau) {
            Bordereau::create($bordereau);
        }
    }
}
