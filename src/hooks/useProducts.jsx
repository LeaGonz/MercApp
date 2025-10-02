/* useProducts hook
- loads products from /data/products.json
- caches products in localStorage (mercapp_products)
*/

import { useState, useEffect, useRef } from "react"

const PRODUCTS_JSON = "/data/products.json"
const LOCALSTORAGE_KEY = "mercapp_products"

export function useProducts() {
    // Read products from localStorage or initialize as empty
    const [products, setProducts] = useState(() => {
        try {
            const localData = localStorage.getItem(LOCALSTORAGE_KEY)
            return localData ? JSON.parse(localData) : []
        } catch (error) {
            console.warn("Failed to parse localStorage Products data", error)
            return []
        }
    });

    const [loading, setLoading] = useState(products.length === 0) // if no products, loading = true
    const [error, setError] = useState(null)
    const stopFetchRef = useRef(null)

    const fetchProducts = async () => {

        // if other fetch in progress, stop it
        if (stopFetchRef.current) stopFetchRef.current.abort();

        const controller = new AbortController()
        stopFetchRef.current = controller

        if (products.length === 0) setLoading(true); // set loading only if no products
        setError(null) // reset error, before fetching

        try {
            const response = await fetch(PRODUCTS_JSON, {
                cache: "no-cache",
                signal: controller.signal
            })

            if (!response.ok) throw new Error(`Failed to fetch products from ${PRODUCTS_JSON}: ${response.status} ${response.statusText}`);

            const data = await response.json()
            setProducts(data.products)

            // Save to localStorage
            updateLocalStorage(data.products)

        } catch (fetchError) {
            if (fetchError.name === "AbortError") {
                console.log("Fetch aborted")
            } else {
                console.error("Error fetching products:", fetchError)
                setError(fetchError)
            }
        } finally {
            // clear 
            setLoading(false)
            stopFetchRef.current = null
        }
    }

    const updateLocalStorage = (data) => {
        try {
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data))
        } catch (localStorageError) {
            console.warn("Failed to save products to localStorage", localStorageError)
        }
    }

    const updatePrice = (productId, newPrice) => {
        setProducts(prev => {
            const updated = prev.map(p =>
                p.id === productId ? { ...p, price: Number(newPrice) } : p
            )
            updateLocalStorage(updated)
            return updated
        })
    }

    // Fetch products if not already loaded
    useEffect(() => {
        if (products.length === 0) fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products.length]);

    // Refresh button handler
    const refreshBtn = () => {
        fetchProducts();
    }

    // Categories list
    const categories = products ? Array.from(new Set(products.map(p => p.category))).sort() : []
    // Unit list
    const units = products ? Array.from(new Set(products.map(p => p.unit))) : []
    // Stores list
    const stores = products ? Array.from(new Set(products.map(p => p.store))).sort() : []

    return {
        products,
        categories,
        units,
        stores,
        loading,
        error,
        updatePrice,
        refreshBtn
    }

}