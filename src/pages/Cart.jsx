import { useCartContext } from "../context/CartContext"
import { X, Trash2 } from "lucide-react"
import { formatCurrency } from "../utils/currencyFormat"

export default function Cart({ isOpen, onClose }) {

    const { activeCart, clearCart, removeFromCart } = useCartContext()

    return (
        <>
            {/* Background blur */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={onClose}
            />

            {/* Cart panel */}
            <div
                className={`fixed top-0 right-0 h-full w-xs sm:w-96 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-grey-200">

                    <h2 className="text-xl">
                        Mi Carrito
                    </h2>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-green-200"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Cart content */}
                <div className="flex flex-col p-3 gap-1 overflow-y-auto flex-1">
                    {activeCart && activeCart.products.length > 0 ?
                        (
                            activeCart.products.map(product => (
                                <div
                                    key={`${product.id}-${product.price}`}
                                    className="flex items-center justify-between border-b border-gray-200 pb-2"
                                >

                                    {/* Emoji */}
                                    <div className="flex-shrink-0">
                                        {product.image ? (
                                            <div className="text-2xl">
                                                {product.image}
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 bg-green-50 rounded-2xl flex items-center justify-center shadow-sm p-5">
                                                <span>
                                                    {product.name
                                                        .split(" ")
                                                        .map(word => word[0].toUpperCase())
                                                        .join("")}
                                                </span>
                                            </div>
                                        )}
                                    </div>


                                    <div className="flex-1 min-w-0 px-3">
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {product.quantity} × {formatCurrency(product.price)}
                                        </p>
                                    </div>
                                    <p className="font-semibold">
                                        {formatCurrency(product.price * product.quantity)}
                                    </p>

                                    <Trash2
                                        className="w-5 h-5 ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                                        onClick={() => removeFromCart(product.id, product.price)}
                                    >
                                        Eliminar
                                    </Trash2>

                                </div>
                            ))
                        )
                        :
                        (
                            <div></div>
                        )}
                </div>
                <button className="bg-red-400 p-1 rounded-xl" onClick={clearCart}>Clean</button>

            </div>
        </>
    )
}