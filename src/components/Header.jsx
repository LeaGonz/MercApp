import LanguageSelector from "./LanguageSelector"

export default function Header() {

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">

            {/* Title + Logo */}
            <h1 className="text-lg font-bold">MercApp</h1>

            {/* Language Selector */}
            <LanguageSelector />
        </header >
    )
}