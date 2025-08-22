import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LayoutMaster() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">

            <Header />

            <main className="flex-1 p-4">
                <Outlet />
            </main>

            <Footer />

        </div>
    )
}