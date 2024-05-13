'use client'
import React from 'react'
import useCart from '@/hooks/useCart'

const Card = () => {

    const { products, addToCart  } = useCart()

    console.log('products', products);


    return (
        <div className='grid grid-cols-3 gap-6 py-6'>
            {products.map(product => (
                <div key={product._id} className='flex flex-col  rounded-xl shadow-md w-full'>
                    <div className='h-52'>
                        <img className='w-full h-full' src={product.image} alt="" />
                    </div>
                    <div className='p-4 flex flex-col gap-2'>
                        <h1 className='text-xl font-bold'>{product.title}</h1>
                        <p className='text-md '>${product.price}</p>
                        <button onClick={() => addToCart(product)} className='border border-b-indigo-300 p-1 rounded-lg cursor-pointer'>Agregar al carrito</button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Card