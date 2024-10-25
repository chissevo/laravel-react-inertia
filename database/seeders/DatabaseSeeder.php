<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name'              => 'Luquembe',
            'email'             => 'luquembe@chisevo.co.ao',
            'password'          => bcrypt('22.12.K'),
            'email_verified_at' => time()
        ]);

        Product::factory()
                ->count(20)
                ->hasCategorys(20)
                ->create();

    }
}
