import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { formatCurrency } from "../utils/currencyFormat"
import { NavLink } from "react-router-dom"
import { Home, Settings, Info, Mail, ShoppingCart } from "lucide-react"
import { useCartContext } from "../context/CartContext"

export default function Footer({ onCartOpen }) {

    const { t } = useTranslation()
    const { totalCart } = useCartContext()
    const [animation, setAnimation] = useState(false)
    const prevTotal = useRef(totalCart)

    // Cart button animation
    useEffect(() => {
        if (totalCart > prevTotal.current) {
            setAnimation(true)
            const timer = setTimeout(() => setAnimation(false), 300)
            return () => clearTimeout(timer)
        }
        prevTotal.current = totalCart
    }, [totalCart])

    // Menu options
    const MENU = [
        { to: "/", label: "home", Icon: Home },
        // { to: "/about", label: "about", Icon: Info },
        { to: "/contact", label: "contact", Icon: Mail },
        { to: "/settings", label: "contact", Icon: Settings },
    ]

    return (
        <footer className="bg-white/90 backdrop-blur-xl border-t border-white/20 shadow-inner flex-shrink-0 z-50">

            <nav className="flex items-center justify-around">
                {/* Menu options */}
                {MENU.map((item) => (
                    <NavLink key={item.to} to={item.to}>

                        {({ isActive }) => (
                            <span className="flex flex-col items-center justify-center p-3 text-xs 
                                transition-colors duration-300">

                                {/* Icon */}
                                <item.Icon className={`w-7 h-7
                                    ${isActive ? "text-green-600" : "text-gray-500"}`} />

                                {/* Label */}
                                <span className={` 
                                    ${isActive ? "text-green-600 font-medium" : "text-gray-500"}`}>
                                    {t(`${item.label}.label`)}
                                </span>
                            </span>
                        )}
                    </NavLink>
                ))}

                {/* Cart button */}
                <button
                    onClick={onCartOpen}
                    className={`flex flex-col p-3 items-center justify-center text-xs text-green-600 w-16 cursor-pointer transition-transform duration-500 ease-out ${animation ? "scale-120 shadow-xl text-white bg-green-600 rounded-lg" : "scale-100 bg-transparent"}`}
                    aria-label="Open cart">
                    <ShoppingCart
                        className="w-7 h-7"
                    />
                    <span>{formatCurrency(totalCart)}</span>
                </button>

            </nav >

        </footer >
    )
}