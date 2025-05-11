<?php

namespace Database\Seeders;

use App\Models\MenuCategory;
use Illuminate\Database\Seeder;

class MenuCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Coffee',
                'description' => 'Various coffee drinks',
                'display_order' => 1,
            ],
            [
                'name' => 'Tea',
                'description' => 'Traditional and specialty teas',
                'display_order' => 2,
            ],
            [
                'name' => 'Breakfast',
                'description' => 'Morning meals and pastries',
                'display_order' => 3,
            ],
            [
                'name' => 'Lunch',
                'description' => 'Hearty midday meals',
                'display_order' => 4,
            ],
            [
                'name' => 'Desserts',
                'description' => 'Sweet treats and cakes',
                'display_order' => 5,
            ],
            [
                'name' => 'Specialty Drinks',
                'description' => 'Seasonal and signature beverages',
                'display_order' => 6,
            ],
        ];

        foreach ($categories as $category) {
            MenuCategory::create($category);
        }
    }
}
