'use client'
import useCart from '@/hooks/useCart';
import Link from 'next/link';
import React from 'react'
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {

    const { cartItems } = useCart()

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <nav className='bg-gray-800 p-4'>
                <div className='container mx-auto flex justify-between'>
                    <div>
                        <Link href="/" className='text-white text-2xl font-bold'>Navbar</Link>
                    </div>
                    <div>
                        <ul className='flex gap-4 items-center'>
                            <li>
                                <Link href='/' className='text-white'>Home</Link>
                            </li>
                            <li>
                                <Link href='add-products' className='text-white'>Add products</Link>
                            </li>
                            <li>
                                <Link href='#' className='text-white'>Contact</Link>
                            </li>
                            <li className='relative'>
                                <Link href='/cart' className='text-white'>
                                    <IoCartOutline size={30} color='#ffffff' />
                                    {totalItems > 0 &&
                                        <span className='absolute top-0 right-0 bg-red-500 w-4 h-4 rounded-full flex justify-center items-center text-xs text-white'>{totalItems}</span>
                                    }
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar