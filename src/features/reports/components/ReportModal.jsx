import { useState } from "react";
import { useReportStore } from "../store/useReportStore.js";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const ReportModal = ({ isOpen, onClose, report }) => {
    const { updateReport } = useReportStore();
    const [status, setStatus] = useState(report?.status || "Pendiente");
    const [isUpdating, setIsUpdating] = useState(false);

    if (!isOpen || !report) return null;

    const handleSave = async () => {
        setIsUpdating(true);
        try {
            await updateReport(report._id || report.id, { status });
            showSuccess("Reporte actualizado correctamente");
            onClose();
        } catch (error) {
            showError("No se pudo actualizar el reporte");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 text-white flex justify-between items-center" style={{ background: "linear-gradient(90deg, #1d4ed8 0%, #1956a3 100%)" }}>
                    <h2 className="text-2xl font-bold">Detalles del Reporte</h2>
                    <button onClick={onClose} className="text-2xl hover:rotate-90 transition duration-300">&times;</button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Título</label>
                            <p className="text-lg font-bold text-gray-900 bg-gray-50 p-4 rounded-2xl border border-gray-100">{report.title}</p>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Cambiar Estado</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-3 rounded-xl border-2 border-gray-100 font-semibold text-gray-700 focus:border-blue-500 outline-none"
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="En Progreso">En Progreso</option>
                                <option value="Resuelto">Resuelto</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t">
                        <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition">
                            Cerrar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isUpdating}
                            className="px-8 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition disabled:opacity-50"
                        >
                            {isUpdating ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};