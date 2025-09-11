import { CirclePlus } from "lucide-react"
import { formatCurrency } from "../utils/currencyFormat"

export default function ProductCard({ product }) {

    const nameInitials = product.name
        .split(" ")
        .map(word => word[0].toUpperCase())
        .join("")

        const addToCart = () => {
            
        }

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

            {/* Price */}
            <div className="w-24 text-right">
                <div className={`text-sm font-semibold ${product.price ? "text-green-700" : "text-gray-400"}`}>
                    {formatCurrency(product.price)}
                </div>
            </div>

            {/* Add button */}
            {(Number.isFinite(product.price) && product.price > 0) &&
                <div className="flex items-center">
                    <button
                        className="bg-white active:scale-95"
                        aria-label={`Add ${product.name}`}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                        onClick={addToCart}
                    >
                        <CirclePlus className="w-6 h-6 text-green-600" />
                    </button>
                </div>
            }
        </div >
    )
}