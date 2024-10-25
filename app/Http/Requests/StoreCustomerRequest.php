<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCustomerRequest extends FormRequest
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
            'name'            =>  ['required', 'max:255'],
            'nif'             =>  ['nullable', 'string'],
            'email'           =>  ['nullable', 'email'],
            'phone_number'    =>  ['required', 'numeric'],
            'addrress_id'     =>  ['nullable', 'exists:addresses,id'],
        ];
    }

    public function messages()
    {
        return [
            'name.required'             =>  'O nome do cliente é obrigatório.',
            'nif.nullable'              =>  'O NIF do cliente é obrigatório.',
            'email.nullable'            =>  'O email do cliente é obrigatório.',
            'phone_number.required'     =>  'O número de telemóvel do cliente é obrigatório.',
        ];
    }
}
