import React, { useEffect, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from "@inertiajs/react";
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';

export default function Index()
{
  const {auth, cart, products, totalGeral} = usePage().props;

  const [showSidebar, setShowSidebar] = useState(false);

  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return(
      <>
      <AuthenticatedLayout
        user= {auth.user}
        header={
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Efectuar Venda
              </h2>
            </div>
        }>

          <Head title="Efectuar Compra" />

          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-800 dark:text-gray-100">

                <div className="flex justify-between items-center">
                  <div>
                    <InputLabel
                          htmlFor="cleinte"
                          value='******SELECCIONAR CLIENTE******'>
                    </InputLabel>
                      <SelectInput
                          name="cliente"
                          id="cliente"
                          className="mt-2 blcok w-full"
                          onChange={(e) => setData('cliente_id', e.target.value)}>
                      </SelectInput>
                  </div>

                 <div>
                    <button className="bg-emerald-500 py-2 px-3 text-white rounded shadow translate-all hover:bg-emerald-600"
                            onClick={() => setShowSidebar(true) }>Adicionar Produtos
                    </button>
                 </div>
                </div>

                <p className='mt-2'/>

                <div className="flex  justify-between items-center"></div>
                {cart == 0 ? (
                  <div className="overflow-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                        dark:text-gray-400 border-b-1 border-gray-500">
                            <tr className="text-nowrap">
                              <th className="px-3 py-3 row-span-3 text-center">Nenhum producto no carrinho</th>
                            </tr>
                        </thead>
                    </table>
                  </div>
                ) : (
                  <div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                                      dark:text-gray-400 border-b-1 border-gray-500">
                      <tr>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                        <th>Ações</th>
                      </tr>
                    </thead>

                    <tbody>
                    {cart.map((item) => (
                              <tr key={item.id}>
                                  <td>{item.name}</td>
                                  <td>{item.price.toFixed(2)} Kz</td>
                                  <td>{item.quantity}</td>
                                  <td>{(item.price * item.quantity).toFixed(2)} Kz</td>
                                  <td>
                                      {/*<form method="POST" action={route('cart.remove', item.id)}>
                                          <button type="submit">Remover</button>
                                      </form>*/}
                                  </td>
                              </tr>
                          ))}
                    </tbody>
                    </table>

                    <h3>Total Geral: {totalGeral.toFixed(2)} Kz</h3>
                      {/*<form method="POST" action={route('cart.checkout')}>
                          <button type="submit">Finalizar Compra</button>
                      </form>*/}
                  </div>)}
                </div>
              </div>
              {/*<!-- Main Modal !>*/}
              <div id='crud-modal' tabIndex={-1} area>

              </div>
            </div>
          </div>

      </AuthenticatedLayout>
      </>
    );
};

