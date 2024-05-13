'use client'
import React from 'react'
import useCart from '@/hooks/useCart'
import axios from 'axios';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const handleCheckout = async () => {
        const orderItems = cartItems.map(item => ({
            title: item.title,
            unit_price: item.price,
            currency_id: "ARS",
            quantity: item.quantity
        }));

        const body = {
            items: orderItems,
            back_urls: {
                success: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/success`,
                failure: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/failure`,
                pending: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pending`,
            },
            notification_url: "https://1c75-186-136-76-159.ngrok-free.app/api/webhook",
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-order`, body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Order response:', response.data);
            window.location.href = response.data.init_point;
            // Manejar la redirección o actualización del estado aquí
        } catch (error) {
            console.error('Error creating order:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            {cartItems.length === 0 ?
                <div className='container mx-auto flex justify-center items-center h-screen'>
                    <p className='text-4xl'>No hay productos en el carrito</p>
                </div>
                :
                <div className='container mx-auto grid grid-cols-[60%_40%] gap-4 items-start py-6'>
                    <div className='rounded-xl shadow-md p-6'>
                        {cartItems.map(item => (
                            <div key={item._id} className='flex gap-4 mb-3 justify-between'>
                                <div className='flex gap-6'>
                                    <div className='w-20 h-20'>
                                        <img className='w-full h-full object-contain' src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <p className='text-xl font-bold'>{item.title}</p>
                                        <p className='text-md'>Cantidad: {item.quantity}</p>
                                    </div>
                                    <div>
                                        <p className='text-xl font-bold'>${item.price}</p>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => removeFromCart(item)} className='border border-red-500 p-1 rounded-lg cursor-pointer'>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='rounded-xl shadow-md p-6'>
                        <p className='text-2xl'>Resumen de compra</p>
                        <hr className='my-4' />
                        {cartItems.map(item => (
                            <div key={item._id} className='flex gap-3 justify-between mb-3'>
                                <p>{item.title} x {item.quantity}</p>
                                <p>${item.price * item.quantity}</p>
                            </div>
                        ))}
                        <div className='flex gap-3 justify-between mb-5'>
                            <p className='text-xl font-bold'>Total</p>
                            <p className='text-xl font-bold'>${total}</p>
                        </div>
                        <div>
                            <button onClick={handleCheckout} className='p-2 text-white bg-blue-700 cursor-pointer rounded-xl w-full'>Comprar</button>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default Cart
