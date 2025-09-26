/*
useCart hook
- caches and load cart from localStorage
- manages active and pending carts
- handles cart operations: add, remove, update, finalize
- designed to be used on CartProvider (context)
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
    }, [carts])

    // Total price from products
    const calculateTotal = (products) =>
        products.reduce(
            (total, product) =>
                total + ((Number(product.price) || 0) * (Number(product.quantity) || 0))
            , 0)

    // Add product to active cart
    const addToCart = (product, quantity) => {

        // Normalize new product
        const productToAdd = {
            id: product.id,
            name: product.name,
            quantity: quantity !== undefined ? Number(quantity) : 1,
            price: product.price !== undefined ? Number(product.price) : 0,
            store: product.store,
            image: product.image || ""
        }

        setCarts((prev) => {
            // Find pending cart
            const pendingCartIndex = prev.findIndex((cart) => cart.status === "pending")

            // If pending cart exists
            if (pendingCartIndex !== -1) {
                const cartsCopy = [...prev]
                const cart = cartsCopy[pendingCartIndex] // we will work with this cart

                // Find if product exists and have the same price
                const existingProduct = cart.products.findIndex(
                    (i) => i.id === productToAdd.id && i.price === productToAdd.price)

                let newProducts = [...cart.products]
                if (existingProduct !== -1) {
                    // exists and same precia, just update quantity
                    newProducts[existingProduct] = {
                        ...newProducts[existingProduct],
                        quantity: newProducts[existingProduct].quantity + productToAdd.quantity
                    }
                } else {
                    // no exists or exists but different price, add new item
                    newProducts.push(productToAdd)
                }

                // Build updated cart
                const updatedCart = {
                    ...cart,
                    products: newProducts,
                    total: calculateTotal(newProducts)
                }
                cartsCopy[pendingCartIndex] = updatedCart
                return cartsCopy
            }

            // If no pending cart, create new one
            const newCart = {
                id: Date.now().toString(),
                status: "pending",
                products: [productToAdd],
                total: calculateTotal([productToAdd])
            }

            return [...prev, newCart]
        })
    }

    const clearCart = () => {

        setCarts((prev) => {
            const pendingCartIndex = prev.findIndex((cart) => cart.status === "pending")

            if (pendingCartIndex !== -1) {
                const cartsCopy = [...prev]
                const cleanCart = {
                    ...cartsCopy[pendingCartIndex],
                    products: [],
                    total: 0
                }
                cartsCopy[pendingCartIndex] = cleanCart
                return cartsCopy
            }

            return prev
        })

    }

    const removeFromCart = (productId, price) => {
        setCarts(prev => {
            const pendingCartIndex = prev.findIndex(cart => cart.status === "pending")
            if (pendingCartIndex === -1) return prev

            const cartsCopy = [...prev]
            const cart = cartsCopy[pendingCartIndex]

            const newProducts = cart.products.map(p => {
                if (p.id === productId && p.price === price) {
                    return { ...p, quantity: p.quantity - 1 }
                }
                return p
            }).filter(p => p.quantity > 0) // elimina productos con quantity 0

            cartsCopy[pendingCartIndex] = {
                ...cart,
                products: newProducts,
                total: calculateTotal(newProducts)
            }

            return cartsCopy
        })
    }


    return {
        carts,
        activeCart,
        addToCart,
        clearCart,
        removeFromCart,
        totalCart: activeCart ? activeCart.total : 0
    }
}