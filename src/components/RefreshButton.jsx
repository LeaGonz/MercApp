import { useProductsContext } from "../context/ProductContext"
import { RefreshCcw } from "lucide-react"

export default function RefreshButton() {
    const { refreshBtn } = useProductsContext()

    return (
        <button onClick={refreshBtn} className="bg-green-600 hover:bg-green-700 rounded-full p-2 active:scale-95">
            <RefreshCcw className="w-6 h-6 text-white" />
        </button>
    )
}
