/*
useCart hook
- caches and load cart from localStorage
- manages active and pending carts
- handles cart operations: add, remove, update, finalize
 */

import { useState, useEffect } from "react"

export function useCarts() {

    const LOCALSTORAGE_CART_KEY = "mercapp_carts"

    // Read carts from localStorage or initialize as empty array
    const [carts, setCarts] = useState(() => {
        try {
            const localData = localStorage.getItem(LOCALSTORAGE_CART_KEY)
            return localData ? JSON.parse(localData) : []
        } catch (error) {
            console.warn("Failed to parse localStorage Carts data", error)
            return []
        }
    })

    // Find active cart (pending status) or create a new cart
    const activeCart = carts.find(cart => cart.status === "pending") || null

    // Updated carts on localStorage whenever change
    useEffect(() => {
        try {
            localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(carts))
        } catch (error) {
            console.warn("Failed to save cart to localStorage", error)
        }

        // To notify others components about the update 
        window.dispatchEvent(new CustomEvent("cartUpdate"))
    }, [carts])

    // Total price from products
    const TotalCart = (products) =>
        products.reduce(
            (total, product) => total + (Number(product.price) || 0) * (Number(product.quantity) || 0)
            , 0)

    // Add product to active cart
    const addToCart = (product) => {

        // Normalize new product
        const productToAdd = {
            ...product,
            quantity: product.quantity !== undefined ? Number(product.quantity) : 1,
            price: product.price !== undefined ? Number(product.price) : 0
        }

        setCarts((prev) => {
            // Find pending cart
            const pendingCartIndex = prev.findIndex((cart) => cart.status === "pending")

            // If pending cart exists
            if (pendingCartIndex !== -1) {
                const cartsCopy = [...prev]
                const cart = cartsCopy[pendingCartIndex] // we will work with this cart

                // Find if product exists
                const existingProduct = cart.products.findIndex((i) => i.id === productToAdd.id)

                let newProducts = [...cart.products]
                if (existingProduct !== -1) {
                    // exists
                    newProducts[existingProduct] = {
                        ...newProducts[existingProduct],
                        quantity: newProducts[existingProduct].quantity + productToAdd.quantity
                    }
                } else {
                    // no exists
                    newProducts.push(productToAdd)
                }

                // Build updated cart
                const updatedCart = {
                    ...cart,
                    products: newProducts,
                    total: TotalCart(newProducts)
                }
                cartsCopy[pendingCartIndex] = updatedCart
                return cartsCopy;
            }

            // If no pending cart, create new one
            const newCart = {
                id: Date.now().toString(),
                status: "pending",
                products: [productToAdd],
                total: TotalCart([productToAdd])
            }

            return [...prev, newCart]
        })
    }
}