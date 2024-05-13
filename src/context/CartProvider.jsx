'use client'
import axios from "axios";
import { createContext, useEffect, useState } from "react"

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const consumirApi = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product`)
            setProducts(data.product || [])
        } catch (error) {
            console.error('Error obteniendo professionals', error)
            setProducts([])
        }
    }

    useEffect(() => {
        consumirApi();
      }, [])

      const addToCart = (product) => {
        const existingItem = cartItems.find(item => item._id === product._id);
        if (existingItem) {
            setCartItems(cartItems.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    }

    const removeFromCart = (product) => {
        const existingItem = cartItems.find(item => item._id === product._id);
        if (existingItem.quantity > 1) {
            setCartItems(cartItems.map(item => item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item));
        } else {
            setCartItems(cartItems.filter(item => item._id !== product._id));
        }
    }


    return (
        <CartContext.Provider
            value={{
                cartItems,
                products,
                consumirApi,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export {
    CartProvider
}

export default CartContext