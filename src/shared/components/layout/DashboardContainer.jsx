import { useState } from "react";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { Comments } from "../../../features/comments/components/Comments";
import { Reports } from "../../../features/reports/components/Reports";

export const DashboardContainer = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-10">

                            {activeTab === "dashboard" && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                                    <p className="text-sm text-gray-500">Resumen general del sistema de seguridad</p>
                                </div>
                            )}

                            {activeTab === "reports" && <Reports reports={[]} />}

                            {activeTab === "comments" && <Comments comments={[]} />}

                            {(activeTab === "users" || activeTab === "zones" || activeTab === "ratings") && (
                                <div className="py-20 text-center text-gray-400">
                                    Vista de {activeTab} en desarrollo...
                                </div>
                            )}

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};