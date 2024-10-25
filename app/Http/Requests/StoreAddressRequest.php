<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAddressRequest extends FormRequest
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
        ];
    }

    public function messages()
    {
        return [
            'city.required'             =>  'A cidade onde a empresa está localizada é obrigatório.',
            'country.required'          =>  'O país onde a empresa está localizada é obrigatório.',
            'province.required'         =>  'A província onde a empresa está localizada é obrigatório.',
            'neighborhood.required'     =>  'O bairo onde está localizado a empresa é obrigatório.',
        ];
    }
}
