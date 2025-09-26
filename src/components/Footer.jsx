import { useTranslation } from "react-i18next"
import { formatCurrency } from "../utils/currencyFormat"
import { NavLink } from "react-router-dom"
import { Home, Settings, Info, Mail, ShoppingCart } from "lucide-react"
import { useCartContext } from "../context/CartContext"

export default function Footer({ onCartOpen }) {

    const { t } = useTranslation()
    const { totalCart, clearCart } = useCartContext()

    // Menu options
    const MENU = [
        { to: "/about", label: "about", Icon: Info },
        { to: "/", label: "home", Icon: Home },
        { to: "/contact", label: "contact", Icon: Mail },
        { to: "/settings", label: "contact", Icon: Settings },
    ]

    return (
        <footer className="bg-white/70 backdrop-blur-xl pt-safe-bottom p-2 flex-shrink-0 
        border-t border-white/20 shadow-inner z-50">

            <nav className="flex justify-around items-center">
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
                <button
                    onClick={onCartOpen}
                    className="flex flex-col items-center justify-center text-green-600"
                >
                    <ShoppingCart className="w-7 h-7" />
                    <span className="text-xs">{formatCurrency(totalCart)}</span>
                </button>
            </nav >

        </footer>
    )
}