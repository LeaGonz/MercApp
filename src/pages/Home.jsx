import { useTranslation } from "react-i18next"
import { useProducts } from "../hooks/useProducts"
import ProductCard from "../components/ProductCard"

export default function Home() {
    // Products
    const { products, categories, loading, error, refreshBtn } = useProducts()

    const { t } = useTranslation()

    return (
        <div className="p-2">

            <button onClick={refreshBtn} className="px-3 py-1 bg-green-200 rounded">Atualizar Produtos</button>
            <div className="mb-2 text-sm text-gray-600">Categorias: {categories.join(", ")}</div>

            {loading ? (
                <div className="text-white bg-green-200 rounded">Carregando produtos...</div>
            ) : (
                /* Mobile col 1 - Others screens col 2 */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {products.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div >
    )
}