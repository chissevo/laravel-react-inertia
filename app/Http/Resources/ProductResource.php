<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
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
            'id'             => $this->id,
            'category'       => new CategoryResource($this->categories),
            'product_name'   => $this->product_name,
            'description'    => $this->description,
            'purchase_price' => $this->purchase_price,
            'sale_price'     => $this->sale_price,
            'quantity'       => $this->quantity,
            'assignedUser'   => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'image_path'     => $this->image_path ? Storage::url($this->image_path) : '',
            'created_at'     => (new Carbon($this->created_at))->format('Y-m-d'),
            'createdBy'      => new UserResource($this->createdBy),
            'updatedBy'      => new UserResource($this->updatedBy),
        ];
    }
}
