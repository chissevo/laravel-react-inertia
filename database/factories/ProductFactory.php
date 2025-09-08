<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_name'      =>  fake()->sentence(),
            'description'       =>  fake()->realText(),
            'purchase_price'    =>  2000,
            'sale_price'        =>  3600,
            'quantity'          =>  5,
            'image_path'        =>  fake()->imageUrl(),
            'category_id'       =>  1,
            'assigned_user_id'  =>  1,
            'created_by'        =>  1,
            'updated_by'        =>  1,
        ];
    }
}
