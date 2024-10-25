<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEnterpriseRequest extends FormRequest
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
            'nif'             =>  ['required', 'numeric'],
            'joint_stock'     =>  ['required', 'numeric'],
            'email'           =>  ['required', 'email'],
            'phone_number'    =>  ['required', 'numeric'],
            'logo_image'      =>  ['nullable', 'image'],
            'addrress_id'     =>  ['nullable', 'exists:addresses,id'],
        ];
    }

    public function messages()
    {
        return [
            'name.required'             =>  'O nome da empresa é obrigatório.',
            'nif.required'              =>  'O NIF da empresa é obrigatório.',
            'joint_stock.required'      =>  'O capital social da empresa é obrigatório.',
            'email.required'            =>  'O email da empresa é obrigatório.',
            'phone_number.required'     =>  'O número de telemóvel da empresa é obrigatório.',
            'logo_image.required'       =>  'O logotipo da empresa é obrigatório.'
        ];
    }
}
