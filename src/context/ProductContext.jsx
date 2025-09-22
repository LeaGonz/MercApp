import { createContext, useContext } from "react"
import { useProducts } from "../hooks/useProducts"

const ProductContext = createContext()

export function ProductProvider({ children }) {
    const products = useProducts()
    return (
        <ProductContext.Provider value={products}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProductsContext() {
    return useContext(ProductContext)
}