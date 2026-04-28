import { useState } from "react";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

// Importación de Features
import { Comments } from "../../../features/comments/components/Comments";
import { Reports } from "../../../features/reports/components/Reports";
import { Users } from "../../../features/users/components/Users";
import { Zones } from "../../../features/zones/components/Zones";
import { Ratings } from "../../../features/ratings/components/Ratings";

export const DashboardContainer = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                {/* El Sidebar controla el estado activeTab */}
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-[1400px] mx-auto">
                        {/* Contenedor principal:
                            Mantiene el estilo de bordes redondeados y sombra 
                            visto en todas las capturas (cap admin1 a cap admin5)
                        */}
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-10">

                            {/* 1. Vista de Dashboard */}
                            {activeTab === "dashboard" && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                                    <p className="text-sm text-gray-500">Resumen general del sistema de seguridad</p>
                                </div>
                            )}

                            {/* 2. Vista de Reportes (Basado en cap admin1) */}
                            {activeTab === "reports" && <Reports reports={[]} />}

                            {/* 3. Vista de Comentarios (Basado en cap admin2) */}
                            {activeTab === "comments" && <Comments comments={[]} />}

                            {/* 4. Vista de Usuarios (Basado en cap admin3) */}
                            {activeTab === "users" && <Users users={[]} />}

                            {/* 5. Vista de Zonas (Basado en cap admin4) */}
                            {activeTab === "zones" && <Zones zones={[]} />}

                            {/* 6. Vista de Calificaciones (Basado en cap admin5) */}
                            {activeTab === "ratings" && <Ratings ratings={[]} />}

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};