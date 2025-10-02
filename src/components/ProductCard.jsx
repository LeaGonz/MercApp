import { useState } from "react"
import { useProductsContext } from "../context/ProductContext"
import { useCartContext } from "../context/CartContext"
import { CirclePlus, Minus, Plus } from "lucide-react"
import { formatCurrency } from "../utils/currencyFormat"

export default function ProductCard({ product }) {

    const { updatePrice } = useProductsContext()
    const { addToCart } = useCartContext()

    const [quantity, setQuantity] = useState(1)
    const [isEditingPrice, setIsEditingPrice] = useState(false)
    const [tempPrice, setTempPrice] = useState(0)

    const nameInitials = product.name
        .split(" ")
        .map(word => word[0].toUpperCase())
        .join("")

    const selectQuantity = (n) => {
        const newQuantity = Math.max(1, Math.min(20, quantity + n))
        setQuantity(newQuantity)
    }

    // ---> Handle price logic
    const priceUpdate = () => {
        updatePrice(product.id, tempPrice)
        setIsEditingPrice(false)
    }

    const priceOnChange = (e) => {
        const value = e.target.value
        if (/^\d*\.?\d*$/.test(value)) {
            setTempPrice(value)
        }
    }

    const priceClick = () => {
        setIsEditingPrice(true)
        setTempPrice(product.price || 0)
    }

    const priceKeyDown = (e) => {
        if (e.key === "Enter") {
            priceUpdate()
        } else if (e.key === "Escape") {
            setTempPrice(product.price || 0)
            setIsEditingPrice(false)
        }
    }
    // Handle price logic <---

    const PMButtons = "flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 active:scale-95 transition-all duration-150 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"

    return (
        <div className="bg-white/90 rounded-2xl shadow-sm p-2 flex items-center gap-3">

            {/* Emoji */}
            <div className="flex-shrink-0">
                {product.image ? (
                    <div className="text-2xl">
                        {product.image}
                    </div>
                ) : (
                    <div className="w-8 h-8 bg-green-50 rounded-2xl flex items-center 
                    justify-center shadow-sm p-5">
                        <span>{nameInitials}</span>
                    </div>
                )}
            </div>

            {/* Name, category, store */}
            <div className="flex-1 min-w-0">
                <div className="text-base font-semibold text-gray-900">{product.name}</div>
                <div className="text-xs text-gray-500" >
                    {(product.category).substring(2).trim()} {product.store ? `- ${product.store}` : ""}
                </div>
            </div>

            {/* Quantity */}
            {Number.isFinite(product.price) && product.price > 0 && (
                <div className="flex items-center gap-3">
                    <button
                        className={PMButtons}
                        disabled={quantity <= 1}
                        onClick={() => selectQuantity(-1)}
                    >
                        <Minus className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-900">{quantity}</span>
                    </div>

                    <button
                        className={PMButtons}
                        disabled={quantity >= 20}
                        onClick={() => selectQuantity(1)}

                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Price */}
            <div className="text-right">
                {quantity > 1 &&
                    <div className="text-xs text-gray-500">
                        {quantity}x {formatCurrency(product.price)}
                    </div>
                }
                {isEditingPrice ? (
                    <input
                        type="number"
                        inputMode="decimal"
                        value={tempPrice}
                        onChange={priceOnChange}
                        onKeyDown={priceKeyDown}
                        onBlur={priceUpdate}
                        className="w-15 text-sm font-semibold text-green-700 bg-transparent 
                            border-b border-green-300 outline-none text-right"
                        autoFocus
                    />
                ) : (
                    <div
                        className={`text-sm font-semibold ${product.price ? "text-green-700" : "text-gray-400"}`}
                        onClick={priceClick}
                    >
                        {formatCurrency(product.price * quantity)}
                    </div>
                )}
            </div>

            {/* Add button */}
            {Number.isFinite(product.price) && product.price > 0 && (
                <div className="flex items-center">
                    <button
                        className="bg-white active:scale-95 transition-all duration-150"
                        aria-label={`Add ${product.name}`}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                        onClick={() => {
                            addToCart(product, quantity)
                            setQuantity(1)  // reset default quantity
                        }}
                    >
                        <CirclePlus className="w-6 h-6 text-green-600" />
                    </button>
                </div>
            )}
        </div >
    )
}