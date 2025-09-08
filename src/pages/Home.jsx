import { useTranslation } from "react-i18next"
import { useProducts } from "../hooks/useProducts"
import ProductCard from "../components/ProductCard"
import { useState } from "react"
import { Search, CircleX } from "lucide-react"

export default function Home() {
    const { t } = useTranslation()

    // Products
    const { products, categories, loading, error, refreshBtn } = useProducts()
    const [currentCategory, setCurrentCategory] = useState("all")
    const [searchBar, setSearchBar] = useState("")

    // Filtered products by categories and search Bar
    const filteredProducts = products.filter(p =>
        (currentCategory === "all" || (p.category).trim().toLowerCase() === currentCategory)
        &&
        (p.name.trim().toLowerCase().includes(searchBar.trim().toLowerCase()))
    )

    // UI categories classes
    const cateBase = "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition"
    const cateActive = "bg-green-700 text-white shadow-lg"
    const cateInactive = "bg-white/90 text-gray-800 border border-white/20 hover:bg-green-50"

    // UI Contagem
    const ProductsCount = () => (
        <span
            className="ml-2 text-xs text-black/80 bg-green-200 rounded-full px-1 py-0.5">
            {filteredProducts.length}
        </span>
    )

    return (
        <div className="p-2">

            {/* <button onClick={refreshBtn} className="px-3 py-1 bg-green-200 rounded">Atualizar Produtos</button> */}

            {/* Search bar */}
            <div className="mb-2 relative">
                <input
                    type="text"
                    placeholder={t("categories.searchBar")}
                    value={searchBar}
                    onChange={(e) => setSearchBar(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-2xl text-base outline-none focus:border-green-500 focus:ring-1 focus:ring-green-400 transition-all"
                />
                {/* Search icon */}
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                {/* Clean button */}
                {searchBar && (
                    <CircleX
                        onClick={() => setSearchBar("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                )}
            </div>

            {/* Categories */}
            <div className="mb-5">
                <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1 pb-2">
                    {/* Show "All" button */}
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

                    {/* Categories buttons */}
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
                /* Mobile col 1 - Others screens col 2 and 3 */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                    {filteredProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div >
    )
}