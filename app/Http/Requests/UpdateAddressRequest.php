<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'street'            => ['nullable', 'string'],
            'neighborhood'      => ['nullable', 'string'],
            'city'              => ['required', 'string'],
            'province'          => ['required', 'string'],
            'country'           => ['required', 'string'],
            'address_type'      => ['required', 'max:20'],
            //'address_id'        => ['required', 'numeric'],
        ];
    }
}
