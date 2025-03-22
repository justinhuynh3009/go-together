<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $citiesJson = File::get(base_path('database/cities.json'));
        $cities = json_decode($citiesJson, true);

        $districtsJson = File::get(base_path('database/districts.json'));
        $districts = json_decode($districtsJson, true);

        $wardsJson = File::get(base_path('database/wards.json'));
        $wards = json_decode($wardsJson, true);

        foreach ($cities as $city) {
            $savedCity = City::create([
                'name' => $city['name'],
                'slug' => $city['slug'],
            ]);

            $cityDistricts = collect($districts)->where('parent_code', $city['code'])->map(function ($district) use ($savedCity) {
                return [
                    'name' => $district['name'],
                    'slug' => $district['slug'],
                    'city_id' => $savedCity['id'],
                ];
            });

            DB::table('districts')->insert($cityDistricts->toArray());

            DB::table('districts')->select(['id'])->where('city_id', $savedCity['id'])->get()->each(function ($district) use ($wards, $savedCity) {
                info(data_get($savedCity, 'name') . " - " . data_get($district, 'name') . " - " . data_get($district, 'id'));
                $cityWards = collect($wards)->where('parent_code', data_get($district, 'id'))->map(function ($ward) use ($district) {
                    return [
                        'name' => $ward['name'],
                        'slug' => $ward['slug'],
                        'district_id' => data_get($district, 'id'),
                    ];
                });

                DB::table('wards')->insert($cityWards->toArray());
            });
        }
    }
}
