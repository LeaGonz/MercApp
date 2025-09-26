import { Outlet } from "react-router-dom"
import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Cart from "../pages/Cart"

export default function LayoutMaster() {

    const [isCartOpen, setIsCartOpen] = useState(false)

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-green-100 to-indigo-100">

            <Header />

            <main className="flex-1 overflow-y-auto overscroll-contain">
                <Outlet />
            </main>

            <Footer onCartOpen={() => setIsCartOpen(prev => !prev)} />

            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        </div>
    )
}