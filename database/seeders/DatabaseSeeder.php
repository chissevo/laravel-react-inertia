<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;
use PharIo\Manifest\Author;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name'              => 'Piter Coelho',
            'email'             => 'aluminio@abc.co.ao',
            'password'          => bcrypt('22.12.ABC'),
            'email_verified_at' => time()
        ]);

        Category::factory()->create(
            [
                'name'          => fake()->sentence(),
                'description'   => fake()->realText(),
            ]);

        Product::factory()->create(
            [
                'product_name'      => fake()->sentence(),
                'description'       => fake()->realText(),
                'purchase_price'    => 1800.90,
                'sale_price'        => 2400.96,
                'quantity'          => 5,
                'image_path'        => fake()->imageUrl(),
                'category_id'       =>1,
                'assigned_user_id'  =>1,
                'created_by'        =>1,
                'updated_by'        =>1,

            ]
        );

        Cart::factory()->create(
            [
                'user_id'       => 1,
                'product_id'    => 1,
                'quantity'      => 5,
                'price'         => 4900.50,
        ]);

    }
}
