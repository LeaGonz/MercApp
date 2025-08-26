import LanguageSelector from "./LanguageSelector"

export default function Header() {
    return (
        <header className="bg-white/70 backdrop-blur-xl pt-safe-top p-4 shadow-lg flex-shrink-0">

            <div className="flex justify-between items-center">

                {/* Title + Logo */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-300 
                        rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-m">M</span>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 tracking-tight">MercApp</h1>
                </div>

                {/* Language Selector */}
                <LanguageSelector />

            </div>

        </header>
    )
}
