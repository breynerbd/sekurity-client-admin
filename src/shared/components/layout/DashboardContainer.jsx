import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const DashboardContainer = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Enrutado: El Sidebar ya no necesita setActiveTab, 
            ahora usará <NavLink> de react-router-dom */}
                <Sidebar />

                <main className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC]">
                    <div className="max-w-[1400px] mx-auto">

                        {/* Contenedor principal con el estilo de Sekurity */}
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-10 min-h-full">

                            {/* HEADER DINÁMICO (Opcional) */}
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                                    Panel de Control Sekurity
                                </h2>
                                <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
                            </div>

                            {/* Aquí es donde react-router-dom inyectará Users, Reports, etc. */}
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Outlet />
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};