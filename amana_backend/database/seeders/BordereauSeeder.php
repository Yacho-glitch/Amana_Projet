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
                'code_bordereau'   => 'QB228184525MA',
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
        ];

        foreach($bordereaux as $bordereau) {
            Bordereau::create($bordereau);
        }
    }
}
