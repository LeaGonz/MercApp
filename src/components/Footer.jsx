import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
// Icons
// import homeIcon from "../assets/menu/home.svg"
// import aboutIcon from "../assets/menu/about.svg"
// import contactIcon from "../assets/menu/contact.svg"

const homeSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" {...props}>
        <path fill="currentColor" d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z" /></svg>
)
const aboutSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" {...props}>
        <path fill="currentColor" d="M80 480L80 224L560 224L560 480C560 488.8 552.8 496 544 496L352 496C352 451.8 316.2 416 272 416L208 416C163.8 416 128 451.8 128 496L96 496C87.2 496 80 488.8 80 480zM96 96C60.7 96 32 124.7 32 160L32 480C32 515.3 60.7 544 96 544L544 544C579.3 544 608 515.3 608 480L608 160C608 124.7 579.3 96 544 96L96 96zM240 376C270.9 376 296 350.9 296 320C296 289.1 270.9 264 240 264C209.1 264 184 289.1 184 320C184 350.9 209.1 376 240 376zM408 272C394.7 272 384 282.7 384 296C384 309.3 394.7 320 408 320L488 320C501.3 320 512 309.3 512 296C512 282.7 501.3 272 488 272L408 272zM408 368C394.7 368 384 378.7 384 392C384 405.3 394.7 416 408 416L488 416C501.3 416 512 405.3 512 392C512 378.7 501.3 368 488 368L408 368z" /></svg>
)
const contactSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"{...props}>
        <path fill="currentColor" d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z" /></svg>
)

export default function Footer() {
    const { t } = useTranslation()

    // Menu options
    const MENU = [
        { to: "/about", label: "about", Icon: aboutSvg },
        { to: "/", label: "home", Icon: homeSvg },
        { to: "/contact", label: "contact", Icon: contactSvg },
    ]

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl
            border-t border-white/20 ring-1 ring-black/50"
        >
            {/* Container to center content */}
            <div className="max-w-7xl mx-auto">
                {/* Menu options */}
                <div className="grid grid-cols-3 h-15 mt-1">
                    {MENU.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                        >
                            {({ isActive }) => (
                                <span className="flex flex-col items-center justify-center gap-0.5
                                text-xs transition-colors duration-200">
                                    {/* Icon */}
                                    <Icon className={`w-7 h-7 object-cover
                                    ${isActive ? "text-green-600" : "text-gray-500"}`} />
                                    {/* Label */}
                                    <span className={` 
                                    ${isActive ? "text-green-600 font-medium" : "text-gray-500"}`}>
                                        {t(`${label}.label`)}
                                    </span>
                                </span>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div >
        </nav >
    )
}