import { Navbar } from "./Navbar.jsx"
import { Sidebar } from "./Sidebar.jsx"

export const DashboardContainer = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-[1400px] mx-auto">

                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-10">

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                                <p className="text-sm text-gray-500">Resumen general del sistema de seguridad</p>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
