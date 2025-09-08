import React, { useEffect, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from "@inertiajs/react";
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';

export default function Index()
{
  const {auth, cart, products, customers, queryParams = null } = usePage().props;

  const [showSidebar, setShowSidebar] = useState(false);

  const [showModal, setShowModal]     = useState(false);

  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingQuantity, setEditingQuantity]       = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const onSubmitBy=(e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    router.post(route)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    router.post(route("cart.add"), formData, {
      preserveScroll: true,
      onSuccess: () => setShowSidebar(false),
    });
  }
  /** This method permit change quantity */
  const handleUpdateQuantity = async (productId, quantity) => {
    setIsUpdating(true);
    router.post(route('cart.update'), {
      product_id: productId,
      quantity: quantity,
    },{
      preserveScroll: true,
    });

    setIsUpdating(false);
  };

  const searchFindProduct = {
  }

  // Função para calcular o subtotal
  const calcularSubtotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id == productId);
      if (product) {
        // Certifique-se de que product.sale_price é um número
        const price = typeof product.sale_price === 'string' ? parseFloat(product.sale_price) : product.sale_price;
        // Certifique-se de que quantity é um número
        const qty = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;

        if (!isNaN(price) && !isNaN(qty)) {
          return total + (price * qty);
        }
      }
      return total;
    }, 0);
  };

  const subtotal = calcularSubtotal();

  /** This method permit to remove an item from the cart */
  const handleRemoveProduct = (productId) => {
    router.post(route('cart.update'), {
      product_id: productId,
      quantity: 0,
    }, { preserveScroll: true });
  }

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

            {/** Start Try New Cart */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-800 dark:text-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold mb-6">Facturação</h1>
                      <p className="mb-8 text-gray-600">Evo Soft - Comércio & Prestação de Serviço</p>
                    </div>
                    <div>
                      <button className="bg-emerald-500 py-2 px-12 text-white rounded shadow translate-all hover:bg-emerald-600"
                              onClick={() => setShowSidebar(true) }>
                              <i className="fa fa-bars" aria-hidden="true"></i>
                              Produtos
                      </button>
                    </div>
                  </div>

                  <div className="mb-8">
                      <div className="grid grid-cols-4 gap-4 border-b-2 border-gray-200 pb-2 font-semibold">
                          <div>Nome do Producto</div>
                          <div>Preço Unitário</div>
                          <div>Quantidade</div>
                          <div>Opções</div>
                      </div>

                        {Object.entries(cart).map(([productId, quantity]) => {
                          const product = products.find(p => p.id == productId);
                          return (
                            <div key={productId} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-100">
                              <div className="text-gray-200 col-span-1 font-semibold">{product.product_name}</div>
                              <div className="font-semibold">{product.sale_price} Kz</div>
                              <div>
                                <input type="number"
                                    value={quantity}
                                    className='w-28 p-1 border rounded text-center text-white bg-gray-800 font-semibold'
                                    min={1}
                                    onChange={(e) => { const newQuantity = parseInt(e.target.value);
                                          if(!isNaN(newQuantity) && newQuantity >= 1){
                                            handleUpdateQuantity(productId, newQuantity);
                                          }}}
                                    disabled={isUpdating}
                                    />
                                </div>
                              <div>
                                <button onClick={() => handleRemoveProduct(productId)}
                                        className="ml-4 text-red-500 hover:text-red-700">X
                                </button>
                              </div>
                            </div>
                          )
                        })}

                      <div className="grid grid-cols-6 gap-2 py-2 text-white-600 bg-orange-400">
                          <div></div>
                          <div className="float-left font-bold col-space-2">Total Geral</div>
                          <div></div>
                          <div className="float-right font-bold p-1">{subtotal.toFixed(2)} Kz</div>
                      </div>

                      <div className="float-right pt-2 grid grid-cols-1">
                        <button className="bg-emerald-500 py-2 px-12 rounded shadow translate-all hover:bg-emerald-600"
                                onClick={() => setShowModal(true) }>
                                  Concluir a Compra
                        </button>
                      </div>
                  </div>
                </div>
                </div>
            </div>
            {/** End Try New Cart */}


            {/** Start the cart */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

              </div>

              {/** Start Show Modal   *
                  {showModal && (
                    <div className="fixed right-0 top-0 w-[500px] h-full bg-slate-50 shadow-lg p-6 overflow-y-auto">
                      <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-4 right-4 text-gray-900 hover:text-gray-500">
                          <header className=''>X</header>
                      </button>
                      {!showFormModal ? (
                        // Formulário de Adicionar Produto Existente
                        <form
                            onSubmit={onSubmitBy}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold mb-4">Emitir Factura</h3>

                            <div className="p-2">
                                <label htmlFor="cliente">Seleccione o Cliente</label>
                                <select
                                    name="costumer_id"
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="add_costumer" className="absolute top-4 right-4 text-gray-900 hover:text-gray-500">Seleccione</option>
                                    <option value="add_costumer" className="absolute top-4 right-4 text-gray-900 hover:text-gray-500" key="" required>Adicionar Novo</option>
                                    {customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="p-2">
                              <label htmlFor="document_type">Tipo de Documento</label>
                              <select
                                  name="costumer_id"
                                  className="w-full p-2 border rounded">
                                  <option value="add_costumer" className="">Seleccione</option>
                                  <option value="add_costumer" className="">Factura Por Forma</option>
                                  <option value="add_costumer" className="">Factura</option>
                                  <option value="add_costumer" className="">Factura Recibo</option>
                              </select>
                            </div>

                            <div className="p-2">
                              <label htmlFor="document_type">Tipo de Imposto</label>
                              <select
                                  name="costumer_id"
                                  className="w-full p-2 border rounded">
                                  <option value="add_costumer" className="">Seleccione</option>
                                  <option value="add_costumer" className="">IVA</option>
                                  <option value="add_costumer" className="">Imposto Industrial</option>
                                  <option value="add_costumer" className="">Imposto de Selo</option>
                              </select>
                            </div>

                            <div className="p-2">
                                <label htmlFor="">Forma de Pagamento</label>
                                <select
                                    name="costumer_id"
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="" className="absolute top-4 right-4 text-gray-900 hover:text-gray-500">Seleccione</option>
                                    <option value="pronto_pagamento" className="absolute top-4 right-4 text-gray-900 hover:text-gray-500">Pronto Pagamento</option>
                                    <option value="transferencia_bancaria" className="absolute top-4 right-4 text-gray-900 hover:text-gray-500">Transferência Bancária</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded w-full"
                            >
                                Emitir Factura
                            </button>
                        </form>
                    ) : (
                        // Formulário de Cadastrar Novo Produto
                        <form
                            method="POST"
                            action={route('products.store')}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold mb-4">Novo Produto</h3>




                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded flex-1"
                                >
                                    Emitir Factura
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowNewProductForm(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded flex-1"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                    </div>

                  )}
              {/** End Start Show Modal  */}
              {/*<!-- Main Modal Get paid for • Gigs • Referrals • Surveys • Skills Easiest way to make money online! !>*/}
              {showSidebar && (
                  <div className="fixed right-0 top-0 w-96 h-full bg-slate-50 shadow-lg p-6 overflow-y-auto">
                    <button
                        onClick={() => setShowSidebar(false)}
                        className="absolute top-4 right-4 text-gray-900 hover:text-gray-500">
                          X
                    </button>

                    {!showNewProductForm ? (
                        // Formulário de Adicionar Produto Existente
                        <form
                            onSubmit={onSubmit}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold mb-4">Adicionar Produto</h3>

                            <label htmlFor="font-semibold">Seleccione o Producto</label>
                            <input type="text"
                                   name="search_product"
                                   className="w-full p-2 border rounded"
                                   placeholder="Buscar Pelo Nome do Producto"
                                   onKeyPress={(e) => { const search = (e.target.value);
                                    if(!isNaN(search) && search != ''){
                                      searchFindProduct(search);
                                    }}}
                            />
                            <select
                                name="product_id"
                                className="w-full p-2 border rounded"
                            >
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.product_name} -- {product.sale_price} Kz
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                name="quantity"
                                defaultValue="1"
                                className="w-full p-2 border rounded"
                            />

                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded w-full"
                            >
                                Adicionar ao Carrinho
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowNewProductForm(true)}
                                className="text-blue-500 underline mt-4"
                            >
                                Não encontrou o produto? Cadastre um novo.
                            </button>
                        </form>
                    ) : (
                        // Formulário de Cadastrar Novo Produto
                        <form
                            method="POST"
                            action={route('products.store')}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-semibold mb-4">Novo Produto</h3>

                            <input
                                type="text"
                                name="name"
                                placeholder="Nome do Produto"
                                className="w-full p-2 border rounded"
                            />

                            <input
                                type="number"
                                name="price"
                                placeholder="Preço"
                                step="0.01"
                                className="w-full p-2 border rounded"
                            />

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded flex-1"
                                >
                                    Cadastrar e Adicionar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowNewProductForm(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded flex-1"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                  </div>
              )}
            </div>
          </div>

      </AuthenticatedLayout>
      </>
    );
};

