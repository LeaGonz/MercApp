import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

// Flags
import ptFlag from "../assets/flags/pt.svg"
import esFlag from "../assets/flags/es.svg"
import enFlag from "../assets/flags/gb.svg"

// Languages options and images
const LNG = [
    { lng: "pt", img: ptFlag },
    { lng: "es", img: esFlag },
    { lng: "en", img: enFlag }
]

export default function LanguageSelector() {

    const { i18n } = useTranslation()
    const currentLanguage = i18n.language || i18n.resolvedLanguage

    // Function to open/close down menu
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
    const menuRef = useRef(null)

    // Function to change language
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        setOpen(false)
    }

    useEffect(() => {

        // Close menu when clicking outside
        const handleClickOutside = (e) => {
            // IF click is outside "clickFora" class, execute method
            if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
        }

        // Close menu when pressing "Escape" key
        const handlePressEscape = (e) => {
            if (e.key === "Escape") setOpen(false)
        }

        // Execute listeners
        document.addEventListener("pointerdown", handleClickOutside)
        document.addEventListener("keydown", handlePressEscape)

        // Cleanup listeners
        return () => {
            document.removeEventListener("pointerdown", handleClickOutside)
            document.removeEventListener("keydown", handlePressEscape)
        }

    }, [])

    return (
        <div
            className="relative inline-block"
            ref={menuRef}>

            <button
                type="button"
                onClick={toggle}
                className="group flex items-center justify-center w-11 h-11 rounded-full 
                bg-white/80 backdrop-blur-xl shadow-lg border border-white/20
                transition-all duration-200 ease-out
                hover:bg-white/90 hover:shadow-xl hover:scale-105
                active:scale-95 active:bg-white/70"
            >
                {/* Current Flag */}
                <span className="w-6 h-4 rounded-sm overflow-hidden shadow-sm">
                    <img
                        src={LNG.find((l) => l.lng === currentLanguage)?.img}
                        alt={`${currentLanguage} Flag`}
                        className="w-full h-full object-cover"
                    />
                </span>
            </button>

            {open && (
                <div
                    className="absolute right-0 mt-2 min-w-[100px] origin-top-right z-50
                animate-in fade-in-0 zoom-in-95 duration-200"
                >
                    <div
                        className="rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl 
                    border border-white/20 ring-1 ring-black/5 overflow-hidden"
                    >
                        {/* Menu items */}
                        <div className="py-2">
                            {LNG.map((element) => (
                                <button
                                    key={element.lng}
                                    className={`group w-full flex items-center justify-center px-4 py-3
                                    text-left transition-all duration-150 ease-out hover:bg-blue-50/80
                                    focus:outline-none focus:bg-blue-50/80 relative 
                                    ${currentLanguage === element.lng ? "bg-blue-50" : ""}`}
                                    onClick={() => changeLanguage(element.lng)}
                                >
                                    <span
                                        className="w-6 h-4 rounded-sm overflow-hidden shadow-sm 
                                    ring-1 ring-black/10 flex-shrink-0"
                                    >
                                        <img
                                            src={element.img}
                                            alt={`${element.lng} Flag`}
                                            className="w-full h-full object-cover"
                                        />
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
