import { createContext, useContext } from "react"
import { useCarts } from "../hooks/useCarts"

const CartContext = createContext()

export function CartProvider({ children }) {
    const cart = useCarts()
    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    return useContext(CartContext)
}