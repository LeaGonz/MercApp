import { useTranslation } from "react-i18next"
import { useProducts } from "../hooks/useProducts"
import ProductCard from "../components/ProductCard"
import { useState, useMemo } from "react"

export default function Home() {
    const { t } = useTranslation()

    // Products
    const { products, categories, loading, error, refreshBtn } = useProducts()
    const [currentCategory, setCurrentCategory] = useState("all")

    // Filtered products
    const filteredProducts = useMemo(() => {
        if (currentCategory === "all") return products
        return products.filter(p => (p.category).trim().toLowerCase() === currentCategory)
    }, [products, currentCategory])

    // UI categories classes
    const cateBase = "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition"
    const cateActive = "bg-green-700 text-white shadow-md"
    const cateInactive = "bg-white/80 text-gray-800 border border-white/20 hover:bg-green-50"

    // UI Contagem
    const ProductsCount = () => (
        <span
            className="ml-2 text-xs text-black/80 bg-green-200 rounded-full px-2 py-0.5">
            {filteredProducts.length}
        </span>
    )

    return (
        <div className="p-2">

            <button onClick={refreshBtn} className="px-3 py-1 bg-green-200 rounded">Atualizar Produtos</button>

            {/* Categories */}
            <div className="mb-5">
                <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1 pb-2">
                    {/* Show all button */}
                    <button
                        onClick={() => setCurrentCategory("all")}
                        title={`${t("categories.allLabel")}`}
                        className={`${cateBase} ${currentCategory === "all" ? cateActive : cateInactive}`}
                    >
                        {t("categories.allLabel")}
                        {currentCategory === "all" && (
                            <ProductsCount />
                        )}
                    </button>

                    {/* All categories buttons */}
                    {categories.map(cate => (
                        <button
                            key={cate}
                            title={cate}
                            onClick={() => setCurrentCategory(cate.trim().toLowerCase())}
                            className={`${cateBase} 
                            ${cate.trim().toLowerCase() === currentCategory ? cateActive : cateInactive}`}
                        >
                            {cate}
                            {cate.trim().toLowerCase() === currentCategory && (
                                <ProductsCount />
                            )}
                        </button>
                    ))}

                </div>
            </div>

            {/* Products */}
            {loading ? (
                <div className="text-white bg-green-200 rounded">Carregando produtos...</div>
            ) : (
                /* Mobile col 1 - Others screens col 2 */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                    {filteredProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div >
    )
}