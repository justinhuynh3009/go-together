<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge(
            parent::toArray($request),
            [
                'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
                'updated_at' => Carbon::parse($this->updated_at)->diffForHumans(),
            ]
        );
    }
}
