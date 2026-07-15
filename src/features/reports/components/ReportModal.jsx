import { useState, useEffect } from "react";
import { useReportStore } from "../store/useReportStore.js";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const ReportModal = ({ isOpen, onClose, report }) => {
    const { updateReport } = useReportStore();
    const [status, setStatus] = useState("Pendiente");
    const [isUpdating, setIsUpdating] = useState(false);

    // Sincronizar el estado local cuando cambia el reporte seleccionado
    useEffect(() => {
        if (report) setStatus(report.status || "Pendiente");
    }, [report]);

    if (!isOpen || !report) return null;

    // Extraer limpiamente el nombre visible del usuario (sea objeto o string) ✅
    const getUserName = () => {
        if (!report.user) return "Anónimo";
        if (typeof report.user === "object") {
            return report.user.name || report.user.username || "Anónimo";
        }
        return report.user;
    };

    const userName = getUserName();
    const initialLetter = userName.charAt(0).toUpperCase();

    // Función de actualización integrada para resolver el handleSave alternativo ✅
    const handleSave = async () => {
        setIsUpdating(true);
        try {
            const reportId = report._id || report.id;
            await updateReport(reportId, { status });
            showSuccess("Estado del reporte actualizado");
            onClose();
        } catch (err) {
            showError(err?.message || "Error al actualizar el reporte");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-md flex justify-center items-end sm:items-center z-[999] px-0 sm:px-4">
            <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[90vh] flex flex-col">

                {/* HEADER */}
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800">Detalles del Incidente</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* CONTENT - SCROLLABLE */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    <section>
                        <label className="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] block mb-2">Asunto</label>
                        <p className="text-lg font-bold text-gray-900 leading-tight">{report.title}</p>
                    </section>

                    <section className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest block mb-2">Descripción detallada</label>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{report.description}</p>
                    </section>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block">Prioridad</label>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${report.priority === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                }`}>
                                <span className={`w-2 h-2 rounded-full mr-2 ${report.priority === 'Alta' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                {report.priority}
                            </span>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block">Informado por</label>
                            <div className="text-sm font-bold text-gray-800 flex items-center">
                                <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] mr-2">
                                    {initialLetter}
                                </span>
                                {userName}
                            </div>
                        </div>
                    </div>

                    <section className="pt-4 border-t border-gray-100">
                        <label className="text-xs font-bold text-gray-800 mb-3 block">Estado de Resolución</label>
                        <div className="grid grid-cols-1 gap-2">
                            {['Pendiente', 'En Progreso', 'Resuelto'].map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setStatus(opt)}
                                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${status === opt
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                                        }`}
                                >
                                    <span className="text-sm font-bold">{opt}</span>
                                    {status === opt && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* ACTIONS */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="order-2 sm:order-1 flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="order-1 sm:order-2 flex-[2] py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isUpdating ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                        ) : "Actualizar Reporte"}
                    </button>
                </div>
            </div>
        </div>
    );
};