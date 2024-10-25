<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class EnterpriseResource extends JsonResource
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
            'id'                => $this->id,
            'name'              => $this->name,
            'nif'               => $this->nif,
            'joint_stock'       => $this->joint_stock,
            'email'             => $this->email,
            'phone_number'      => $this->phone_number,
            'address'           => new AddressResource($this->address),
            'logo_image'        => $this->logo_image ? Storage::url($this->logo_image) : '',
            'created_at'        => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at'        => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
