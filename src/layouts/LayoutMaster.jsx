import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LayoutMaster() {
    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-green-100 to-indigo-100">

            <Header />

            <main className="flex-1 overflow-y-auto overscroll-contain">
                <Outlet />
            </main>

            <Footer />

        </div>
    )
}