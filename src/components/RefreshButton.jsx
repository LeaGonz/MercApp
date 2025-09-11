import { useProducts } from "../hooks/useProducts"
import { RefreshCcw } from "lucide-react"

export default function RefreshButton() {
    const { refreshBtn } = useProducts()

    return (
        <button onClick={refreshBtn} className="active:scale-95">
            <RefreshCcw className="w-6 h-6 text-gray-600" />
        </button>
    )
}
