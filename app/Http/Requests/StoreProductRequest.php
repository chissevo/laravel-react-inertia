<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
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
            'product_name'      =>  ['required', 'max:255'],
            'description'       =>  ['required', 'string'],
            'purchase_price'    =>  ['required', 'string'],
            'sale_price'        =>  ['required', 'string'],
            'quantity'          =>  ['required', 'numeric'],
            'image_path'        =>  ['nullable', 'image'],
            'category_id'       =>  ['nullable', 'exists:categories,id'],
            'assigned_user_id'  =>  ['nullable', 'exists:users,id'],
        ];
    }

    public function messages()
    {
        return [
            'product_name.required'      =>  'O nome da produto é obrigatório.',
            'description.required'      =>  'A descrição do produto é obrigatório.',
            'purchase_price.required'   =>  'O preço de compra é obrigatório.',
            'sale_price.required'       =>  'O preço de venda é obrigatório.',
            'quantity.required'         =>  'O quantidade é obrigatório.',
            'category_id.requirid'      =>  'A categoria do produto é obrigatório.',
            'image_path.nullable'       =>  'A imagem do produto é obrigatório.'
        ];
    }
}
