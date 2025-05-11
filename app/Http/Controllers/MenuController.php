<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $categories = MenuCategory::orderBy('display_order')->get();

        return inertia('Menu/Category/List', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'nullable|string',
            'display_order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->has('id')) {
            $category = MenuCategory::findOrFail($request->id);
            $category->update($validated);
        } else {
            MenuCategory::create($validated);
        }

        return redirect()->back();
    }

    public function destroy($id)
    {
        $category = MenuCategory::findOrFail($id);
        $category->delete();

        return redirect()->back();
    }

    public function menuItems()
    {
        $menuItems = MenuItem::orderBy('id')->get();
        $categories = MenuCategory::orderBy('display_order')->get()->map(
            function ($category) {
                return [
                    'value' => $category->id,
                    'label' => $category->name,
                ];
            }
        );

        return inertia('Menu/Item/List', [
            'menuItems' => ProductResource::collection($menuItems)->resolve(),
            'categories' => $categories,
        ]);
    }


    public function storeItem(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'category_id' => 'required|exists:menu_categories,id',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|url',
            'description' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        if ($request->has('id')) {
            $category = MenuItem::findOrFail($request->id);
            $category->update($validated);
        } else {
            MenuItem::create($validated);
        }

        return redirect()->back();
    }
}
