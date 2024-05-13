'use client'
import useCart from '@/hooks/useCart'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const AddProducts = () => {

    const {consumirApi} = useCart()
    const router = useRouter()

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: 0,
    })
    const [file, setFile] = useState(null)


    const { title, description, price } = form


    const handleChangeForm = e => {
        if (e.target.name === 'image') {
            setFile(e.target.files[0])
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('description', form.description)
        formData.append('price', form.price)

        if (file) {
            formData.append('image', file)
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log('response', response.data)
            if (response.data) {
                consumirApi();
                router.push('/')
            }

            setForm({
                title: '',
                description: '',
                price: 0,
            })
            setFile(null)
        } catch (error) {
            console.error('Error', error.response ? error.response.data : error.message)
        }
    }

    return (
        <div className='max-w-xl mx-auto my-6'>
            <h1 className='text-2xl font-bold mb-6 text-center'>Agregar Producto</h1>
            <form onSubmit={handleSubmitForm} className='flex flex-col gap-4'>
                <input
                    type="text"
                    placeholder='Titulo'
                    name='title'
                    value={title}
                    onChange={handleChangeForm}
                    className='border border-gray-300 p-2 rounded-lg'
                />
                <input
                    type="text"
                    placeholder='Descripcion'
                    name='description'
                    value={description}
                    onChange={handleChangeForm}
                    className='border border-gray-300 p-2 rounded-lg'
                />
                <input
                    type="number"
                    placeholder='Precio'
                    name='price'
                    value={price}
                    onChange={handleChangeForm}
                    className='border border-gray-300 p-2 rounded-lg'
                />
                <input
                    type="file"
                    name='image'
                    onChange={handleChangeForm}
                    className='border border-gray-300 p-2 rounded-lg'
                />
                <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg'>Agregar</button>
            </form>
        </div>
    )
}

export default AddProducts