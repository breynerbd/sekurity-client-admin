import { useState } from "react";
import { ZoneModal } from "./ZoneModal.jsx";

export const Zones = ({ zones = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full font-sans">
            {/* Header con el botón "Nueva Zona" */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Zonas</h1>
                    <p className="text-gray-500 text-sm">Administra las zonas geográficas del sistema</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all hover:scale-105"
                >
                    <span className="text-xl">+</span> Nueva Zona
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8">
                <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar zonas..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
            </div>

            {/* Grid de Zonas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {zones.length > 0 ? (
                    zones.map((zone) => (
                        <div key={zone.id} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    📍
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">✏️</button>
                                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">🗑️</button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{zone.name}</h3>
                            <p className="text-gray-400 text-xs mb-6 line-clamp-2">{zone.description}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400 font-medium">Total Reportes</span>
                                    <span className="text-gray-900 font-bold">{zone.totalReports}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400 font-medium">Reportes Activos</span>
                                    <span className="text-blue-600 font-bold">{zone.activeReports}</span>
                                </div>
                                <div className="h-px bg-gray-50 w-full"></div>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                                🌐 {zone.lat}, {zone.lng}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-gray-400 italic bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
                        No hay zonas registradas aún.
                    </div>
                )}
            </div>

            <ZoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};