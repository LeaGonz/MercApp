import { useState } from "react"
import { useTranslation } from "react-i18next"
import { X, Plus, ShoppingBasket } from "lucide-react"
import { useProductsContext } from "../context/ProductContext"

export default function NewProduct() {
    // Translation
    const { t } = useTranslation()

    // Products context
    const { products, categories, units, stores } = useProductsContext()

    // Modal state
    const [modalAddProduct, setModalAddProduct] = useState(false)

    // Form state
    const [productData, setProductData] = useState({
        name: "",
        category: categories[0] || "",
        unit: units[0] || "",
        price: 0,
        image: "",
        store: stores[0] || ""
    })

    // Error state
    const [errors, setErrors] = useState({
        name: false,
        category: false,
        price: false,
        unit: false,
        store: false
    })

    const handleAddProduct = () => {
        // Validate
        const Errors = {
            name: !productData.name.trim(),
        }
        setNameError(!productData.name.trim())
        setPriceError(isNaN(productData.price) || Number(productData.price) < 0)

    }

    // Function to get the next available ID
    const getNextId = (products) => {
        if (!products || products.length === 0) return 1
        return Math.max(...products.map(p => p.id)) + 1
    }

    const labelCSS = "block text-m font-semibold text-gray-700 mb-1"
    const inputCSS = "w-full rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"

    return (
        <>
            <div
                className="fixed bottom-20 right-3.5 bg-green-600 text-white p-4 rounded-full  shadow-2xl hover:bg-green-700 active:scale-95 transition-all duration-150 z-50"
            >
                <Plus
                    onClick={() => setModalAddProduct(true)}
                    aria-label="Add new product"
                    className="w-6 h-6"
                />
            </div>

            {/* Add New Product Modal */}
            {modalAddProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-sm mb-20">

                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-300">

                            <h2 className="text-xl flex items-center gap-2">
                                <ShoppingBasket className="w-12 h-12 bg-green-100 text-green-700 rounded-lg p-2" />
                                {t("product.new")}
                            </h2>

                            {/* Close button */}
                            <X
                                onClick={() => setModalAddProduct(false)}
                                aria-label="Close cart"
                                className="w-9 h-9 p-2 rounded-full bg-gray-100 hover:bg-green-700 hover:text-white transition-colors duration-100"
                            />
                        </div>

                        {/* Form */}
                        <div className="flex flex-col p-4 space-y-4">

                            {/* Name */}
                            <div>
                                <label className={labelCSS}>
                                    {t("product.name")} *
                                </label>

                                <input
                                    type="text"
                                    value=""
                                    // onChange={e =>}
                                    placeholder="Ex: Arroz"
                                    className={inputCSS + (nameError ? " border-red-500" : "")}
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className={labelCSS}>
                                    {t("product.category")}
                                </label>

                                <select
                                    type="text"
                                    value=""
                                    // onChange={e =>}
                                    placeholder="Ex: Mercearia"
                                    className={inputCSS}
                                >
                                    {categories.map(c => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {/* Price */}
                                <div>
                                    <label className={labelCSS}>
                                        {t("product.price")}
                                    </label>

                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        value=""
                                        // onChange={e =>}
                                        placeholder="Ex: 1.99"
                                        className={inputCSS + (priceError ? " border-red-500" : "")}
                                    />
                                </div>

                                {/* Unit */}
                                <div>
                                    <label className={labelCSS}>
                                        {t("product.unit")}
                                    </label>

                                    <select
                                        type="text"
                                        value=""
                                        // onChange={e =>}
                                        placeholder="Ex: kg"
                                        className={inputCSS}
                                    >
                                        {units.map(u => (
                                            <option key={u} value={u}>
                                                {u}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {/* Loja */}
                                <div>
                                    <label className={labelCSS}>
                                        {t("product.store")}
                                    </label>

                                    <select
                                        type="text"
                                        value=""
                                        // onChange={e =>}
                                        placeholder="Ex: Pingo Doce"
                                        className={inputCSS}
                                    >
                                        {stores.map(s => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Emoji */}
                                <div>
                                    <label className={labelCSS}>
                                        {t("product.image")}
                                    </label>

                                    <input
                                        type="text"
                                        value=""
                                        // onChange={e =>}
                                        placeholder="Ex: 🍚"
                                        className={inputCSS}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-between bg-gray-50/80 gap-2 p-3 border-t border-gray-300 rounded-b-xl">
                            <button
                                onClick={() => setModalAddProduct(false)}
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                {t("product.cancel")}
                            </button>

                            <button
                                onClick={handleAddProduct}
                                className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                            >
                                {t("product.add")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}