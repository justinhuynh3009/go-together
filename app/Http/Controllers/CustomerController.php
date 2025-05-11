<?php

namespace App\Http\Controllers;

class CustomerController extends Controller
{
    public function index()
    {
        return inertia('Customer/List');
    }

    public function create()
    {
        // return inertia('Customer/Create');
    }

    public function edit($id)
    {
        // return inertia('Customer/Edit', [
        //     'customerId' => $id,
        // ]);
    }
}
