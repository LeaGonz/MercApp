import { Search, CircleX } from "lucide-react"

export default function SearchBar({ value, placeholder, onChange, onClick }) {

    return (
        <div className="mb-2 relative">
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-2xl text-base outline-none focus:border-green-500 focus:ring-1 focus:ring-green-400 transition-all"
            />
            
            {/* Search icon */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            {/* Clean button */}
            {value && (
                <CircleX
                    onClick={onClick}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
            )}
        </div>
    )
}