import { useState, useEffect } from "react";
import { ZoneModal } from "./ZoneModal.jsx";
import { MiniMap } from "./MiniMap.jsx";
import { useZoneStore } from "../store/useZoneStore.js";
import { useZoneActions } from "../hooks/useZoneActions.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Zones = () => {
    const { zones = [], loading, error, getZones } = useZoneStore();
    const { removeZone } = useZoneActions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => { getZones(); }, [getZones]);

    useEffect(() => { if (error) showError(error); }, [error]);

    const handleDelete = (id) => {
        showConfirmToast({
            title: "¿Eliminar Zona?",
            message: "Esta acción eliminará la zona permanentemente del sistema.",
            onConfirm: async () => {
                try {
                    await removeZone(id);
                    showSuccess("Zona eliminada con éxito");
                } catch (err) {
                    showError("Error al intentar eliminar");
                }
            }
        });
    };

    const filteredZones = zones.filter(z =>
        z.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in p-4 md:p-6 lg:p-8">
            {/* HEADER - COPIADO DE REPORTS */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Gestión de Zonas
                    </h2>
                    <div className="h-1.5 w-16 bg-blue-600 mt-2 rounded-full"></div>
                    <p className="text-gray-500 mt-3 font-medium text-sm md:text-base">
                        Administra y supervisa las ubicaciones geográficas del sistema.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg transition-all active:scale-95"
                >
                    + Nueva Zona
                </button>
            </div>

            {/* BUSCADOR - ESTILO REPORTS */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre de zona..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    />
                </div>
            </div>

            {/* LISTADO DE ZONAS - GRID RESPONSIVO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="animate-spin inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                        <p className="text-gray-500 font-semibold italic">Sincronizando zonas...</p>
                    </div>
                ) : filteredZones.length > 0 ? (
                    filteredZones.map((zone) => (
                        <div
                            key={zone.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group overflow-hidden"
                        >
                            {/* MAPA PREVIEW */}
                            <div className="h-40 bg-gray-100 relative overflow-hidden">
                                <MiniMap
                                    lat={zone.latitude || zone.lat}
                                    lng={zone.longitude || zone.lng}
                                />
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase shadow-sm">
                                        Zona Activa
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2 gap-2">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {zone.name}
                                    </h3>
                                    <button
                                        onClick={() => handleDelete(zone.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">
                                    {zone.description || "Sin descripción detallada disponible para esta ubicación."}
                                </p>

                                {/* ESTADÍSTICAS CON TIPOGRAFÍA DE REPORTS */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reportes</span>
                                        <span className="text-sm font-extrabold text-gray-900">{zone.totalReports || 0}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Prioridad</span>
                                        <span className="text-sm font-extrabold text-blue-600">{zone.priority || "Normal"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">No se encontraron zonas que coincidan con la búsqueda.</p>
                    </div>
                )}
            </div>

            <ZoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};