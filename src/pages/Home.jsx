import { useTranslation } from "react-i18next"
import { useProducts } from "../hooks/useProducts"
import { useMemo, useState } from "react"
import ProductCard from "../components/ProductCard"
import SearchBar from "../components/SearchBar"
import CategoriesSelector from "../components/CategoriesSelector"

export default function Home() {
    const { t } = useTranslation()

    // Products
    const { products, categories, loading, error } = useProducts()
    const [currentCategory, setCurrentCategory] = useState("all")
    const [searchBar, setSearchBar] = useState("")

    // Filtered products by categories and search Bar (saved on cache for better performnace)
    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            (currentCategory === "all" || (p.category).trim().toLowerCase() === currentCategory)
            &&
            (p.name.trim().toLowerCase().includes(searchBar.trim().toLowerCase()))
        )
    }, [products, currentCategory, searchBar])

    return (
        <div className="p-2">

            {/* Search bar */}
            <SearchBar
                value={searchBar}
                placeholder={t("categories.searchBar")}
                onChange={e => setSearchBar(e.target.value)}
                onClick={() => setSearchBar("")}
            />

            {/* Categories */}
            <CategoriesSelector
                categories={categories}
                currentCategory={currentCategory}
                label={t("categories.allLabel")}
                productsCount={filteredProducts.length}
                setCurrentCategory={setCurrentCategory}
            />

            {/* Products */}
            {loading ? (
                <div className="text-white bg-green-200 rounded">Carregando produtos...</div>
            ) : error ? (
                <div className="text-white bg-red-200 rounded">Error ao carregar produtos...</div>
            ) : (
                /* Mobile col 1 - Others screens col 2 and 3 */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                    {filteredProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )
            }
        </div >
    )
}