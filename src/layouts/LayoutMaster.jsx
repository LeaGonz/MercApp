import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LayoutMaster() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">

            <Header className="fixed top-0 left-0 right-0 z-50" />

            <main className="flex-1 p-4 pt-14 pb-16 overflow-y-auto max-w-7xl mx-auto w-full">
                <Outlet />
            </main>

            <Footer className="fixed bottom-0 left-0 right-0 z-50" />

        </div>
    )
}