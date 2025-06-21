<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::orderBy('id')->get();

        return inertia('Customer/List', [
            'customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        if ($request->has('id')) {
            $customer = Customer::findOrFail($request->id);
            $customer->update($validated);
        } else {
            Customer::create($validated);
        }

        return redirect()->back();
    }
}
