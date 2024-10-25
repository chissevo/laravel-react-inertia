<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'street'        => $this->street,
            'neighborhood'  => $this->neighborhood,
            'city'          => $this->city,
            'province'      => $this->province,
            'country'       => $this->country,
            'address_type'  => $this->address_type,
            'created_at'    => (new Carbon($this->created_at))->format('d-m-Y'),
            'updated_at'    => (new Carbon($this->updated_at))->format('d-m-Y'),
        ];
    }
}
