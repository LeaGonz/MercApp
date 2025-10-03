import { useState } from "react"
import { useCartContext } from "../context/CartContext"
import { X, Trash2, ShoppingCart, ShoppingBasket } from "lucide-react"
import { formatCurrency } from "../utils/currencyFormat"
import { useTranslation } from "react-i18next"

export default function Cart({ isOpen, onClose }) {
    const { t } = useTranslation()

    const { activeCart, clearCart, removeFromCart, totalCart } = useCartContext()
    const [confirmClear, setConfirmClear] = useState(false)

    return (
        <>
            {/* Background blur */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />

            {/* Cart panel */}
            <div
                className={`fixed top-0 right-0 h-full w-xs sm:w-120 bg-white rounded-l-3xl shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">

                    <h2 className="text-xl flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        {t("cart.title")}
                    </h2>

                    {/* Close button */}
                    <X
                        onClick={onClose}
                        aria-label="Close cart"
                        className="w-9 h-9 p-2 rounded-full bg-gray-100 hover:bg-green-700 hover:text-white transition-colors duration-100"
                    />

                </div>

                {/* Cart content */}
                <div className="flex flex-col p-3 gap-2 overflow-y-auto flex-1">
                    {activeCart && activeCart.products.length > 0 ? (
                        activeCart.products.map(product => (
                            <div
                                key={`${product.id}-${product.price}`}
                                className="flex items-center justify-between gap-2 bg-gray-50 rounded-2xl p-2 shadow-sm"
                            >

                                {/* Emoji */}
                                <div className="flex-shrink-0">
                                    {product.image ? (
                                        <div className="text-2xl items-center justify-center">
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

                                {/* Product details */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {product.quantity} × {formatCurrency(product.price)}
                                    </p>
                                </div>

                                {/* Price */}
                                <p className="font-semibold text-gray-600">
                                    {formatCurrency(product.price * product.quantity)}
                                </p>

                                {/* Remove button */}
                                <Trash2
                                    onClick={() => removeFromCart(product.id, product.price)}
                                    className="w-8 h-7 text-white rounded-full p-1 bg-red-400 cursor-pointer"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <ShoppingBasket className="w-12 h-12 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-900 mb-1">
                                {t("cart.emptyMsg")}
                            </p>
                            <p className="text-sm text-gray-500">
                                {t("cart.emptyMsg2")}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {activeCart && activeCart.products.length > 0 && (
                    <div className="flex flex-col bg-gray-50/80 rounded-bl-3xl border-t border-gray-300 p-3 gap-1">
                        {/* Total */}
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-medium text-gray-600">{t("cart.total")}:</span>
                            <span className="text-2xl font-semibold text-gray-700">{formatCurrency(totalCart)}</span>
                        </div>

                        {/* Clear cart button */}
                        <button
                            onClick={() => setConfirmClear(true)}
                            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl font-medium hover:bg-red-600 transition-colors"
                        >
                            {t("cart.clearMsg.clear")}
                            <ShoppingBasket />
                        </button>
                    </div>
                )}
            </div >

            {/* Clear confirmation modal */}
            {confirmClear && (
                <div
                    onClick={() => setConfirmClear(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-sm"
                    >

                        <h3 className="text-lg font-semibold mb-4">{t("cart.clearMsg.title")}</h3>

                        <p className="text-gray-600 mb-6">{t("cart.clearMsg.description")}</p>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setConfirmClear(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                {t("cart.clearMsg.cancel")}
                            </button>

                            <button
                                onClick={() => {
                                    clearCart()
                                    setConfirmClear(false)
                                }}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                {t("cart.clearMsg.clear")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}