import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const DashboardContainer = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar />

                {/* 
                   CAMBIOS RESPONSIVOS: 
                   - p-4 en móvil, p-8 en escritorio.
                   - pb-28 en móvil para dejar espacio al Tab Bar inferior.
                */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-[#F8FAFC] pb-28 lg:ml-72">
                    <div className="max-w-[1400px] mx-auto">

                        {/* 
                           Contenedor con bordes redondeados adaptados:
                           - rounded-2xl en móvil, rounded-[32px] en escritorio.
                           - p-5 en móvil, p-10 en escritorio.
                        */}
                        <div className="bg-white rounded-2xl lg:rounded-[32px] border border-gray-100 shadow-sm p-5 lg:p-10 min-h-full">

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