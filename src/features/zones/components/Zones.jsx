import { useState, useEffect } from "react";
import { ZoneModal } from "./ZoneModal.jsx";
import { useZoneStore } from "../store/useZoneStore.js";
import { useZoneActions } from "../hooks/useZoneActions.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Zones = () => {
    const { zones, loading, error, getZones } = useZoneStore();
    const { removeZone } = useZoneActions();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getZones();
    }, [getZones]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleDelete = (id) => {
        showConfirmToast({
            title: "¿Eliminar Zona?",
            message: "Esta acción eliminará la zona y sus relaciones de supervisión.",
            onConfirm: async () => {
                try {
                    await removeZone(id);
                    showSuccess("Zona eliminada correctamente");
                } catch (err) {
                    showError("No se pudo eliminar la zona");
                }
            }
        });
    };

    const filteredZones = zones.filter(z =>
        z.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full font-sans p-4">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Zonas</h1>
                    <p className="text-gray-500 text-sm">Administra las zonas geográficas del sistema</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
                >
                    <span>+</span> Nueva Zona
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8">
                <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar zonas por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-10 text-gray-400">Cargando zonas...</div>
                ) : filteredZones.map((zone) => (
                    <div key={zone.id} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">📍</div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" onClick={() => handleDelete(zone.id)}>🗑️</button>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{zone.name}</h3>
                        <p className="text-gray-400 text-xs mb-6 line-clamp-2">{zone.description}</p>
                    </div>
                ))}
            </div>

            <ZoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};