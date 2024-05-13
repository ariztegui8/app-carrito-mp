import CartContext from "@/context/CartProvider"
import { useContext } from "react"


const useCart = () => {
  return useContext(CartContext)
}

export default useCart