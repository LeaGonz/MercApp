import { useTranslation } from "react-i18next";
import { useProducts } from "../hooks/useProducts";
import { useEffect } from "react";

export default function Home() {
    const { t } = useTranslation()
    const { products, categories, loading, error, refreshBtn } = useProducts()

    return (
        <>

            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">{t("home.title")}</h1>
                <p>{t("home.welcomeMessage")}</p>
            </div>

            <button onClick={refreshBtn} className="px-3 py-1 bg-green-200 rounded">Atualizar Produtos</button>
            <div className="mb-2 text-sm text-gray-600">Categorias: {categories.join(", ")}</div>

            {loading ? (
                <div className="text-white bg-green-200 rounded">Carregando produtos...</div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {products.map(p => (
                        <div key={p.id} className="p-3 bg-white rounded shadow-sm">
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-gray-500">{p.category} • {p.unit}</div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}