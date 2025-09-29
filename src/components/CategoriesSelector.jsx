export default function CategoriesSelector({ categories, currentCategory, label, productsCount, setCurrentCategory }) {

    // UI categories classes
    const cateBase = "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition"
    const cateActive = "bg-green-700 text-white"
    const cateInactive = "bg-white/90 text-gray-800 border border-white/20 hover:bg-green-50"

    // UI Contagem
    const ProductsCount = () => (
        <span
            className="ml-2 text-xs text-black/80 bg-green-200 rounded-full px-1 py-0.5">
            {productsCount}
        </span>
    )

    return (
        <div className="mb-5">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1 pb-2">

                {/* Show "All" button */}
                <button
                    onClick={() => setCurrentCategory("all")}
                    className={`${cateBase} ${currentCategory === "all" ? cateActive : cateInactive}`}
                >
                    {label}
                    {currentCategory === "all" && (<ProductsCount />)}
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
                        {cate.trim().toLowerCase() === currentCategory && (<ProductsCount />)}
                    </button>
                ))}

            </div>
        </div>
    )

}