<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bordereaux', function (Blueprint $table) {
            $table->id();
            $table->string('code_bordereau')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamp('date_depot')->nullable();
            $table->float('poids_reel')->default(0);
            $table->string('dernier_statut')->default('trn');
            $table->string('libelle')->nullable();
            $table->timestamp('date_last_status')->nullable();
            $table->string('dest_nom')->nullable();
            $table->string('dest_adress1')->nullable();
            $table->string('dest_adress2')->nullable();
            $table->string('libville')->nullable();
            $table->decimal('amount_crbt', 10, 2)->default(0);
            $table->boolean('paye')->default(false);
            $table->timestamp('date_paiement')->nullable();
            $table->string('tel_dest')->nullable();
            $table->string('tel_livreur')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bordereaux');
    }
};
