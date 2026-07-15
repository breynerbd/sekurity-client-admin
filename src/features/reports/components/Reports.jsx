import { useState, useEffect } from "react";
import { ReportModal } from "./ReportModal.jsx";
import { MiniMap } from "../../zones/components/MiniMap.jsx";
import { useReportStore } from "../store/useReportStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Reports = () => {
    const { reports = [], loading, error, getReports } = useReportStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getReports();
    }, [getReports]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleViewReport = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const handleDelete = (e, reportId) => {
        e.stopPropagation();
        showConfirmToast({
            title: "¿Eliminar reporte?",
            message: "Esta acción eliminará permanentemente el reporte del sistema.",
            onConfirm: async () => {
                try {
                    const { deleteReport } = useReportStore.getState();
                    await deleteReport(reportId);
                    showSuccess("Reporte eliminado con éxito");
                } catch (err) {
                    showError("Error al intentar eliminar");
                }
            }
        });
    };

    // Filtro corregido para buscar por nombre de usuario si viene como objeto ✅
    const filteredReports = reports.filter(r => {
        const titleMatch = r.title?.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Verifica si user es un objeto o un string antes de filtrar
        const userName = typeof r.user === 'object' ? (r.user?.name || r.user?.username) : r.user;
        const userMatch = userName?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return titleMatch || userMatch;
    });

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in p-4 md:p-6 lg:p-8">
            {/* HEADER */}
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Gestión de Reportes
                </h2>
                <div className="h-1.5 w-16 bg-blue-600 mt-2 rounded-full"></div>
                <p className="text-gray-500 mt-3 font-medium text-sm md:text-base">
                    Administra y supervisa todos los incidentes del sistema en tiempo real.
                </p>
            </div>

            {/* FILTROS Y BÚSQUEDA */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por título o usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    />
                </div>
            </div>

            {/* LISTA DE REPORTES */}
            <div className="space-y-4">
                {loading ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="animate-spin inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                        <p className="text-gray-500 font-semibold italic">Sincronizando reportes...</p>
                    </div>
                ) : filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                        <div
                            key={report._id || report.id}
                            onClick={() => handleViewReport(report)}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row">
                                {/* MAPA / IMAGEN */}
                                <div className="w-full sm:w-48 lg:w-64 h-40 sm:h-auto bg-gray-100 relative">
                                    <MiniMap
                                        lat={report.lat || report.latitude}
                                        lng={report.lng || report.longitude}
                                    />
                                    <div className="absolute top-2 left-2">
                                        <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase shadow-sm ${report.priority === 'Alta' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                            }`}>
                                            {report.priority}
                                        </span>
                                    </div>
                                </div>

                                {/* CONTENIDO */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2 gap-2">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                {report.title}
                                            </h3>
                                            <button
                                                onClick={(e) => handleDelete(e, report._id || report.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {report.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-4 border-t border-gray-50 mt-auto">
                                        <div className="flex items-center text-xs text-gray-400 font-medium">
                                            <span className="mr-1.5">👤</span> 
                                            {/* Corregido para manejar strings u objetos de usuario ✅ */}
                                            {typeof report.user === 'object' 
                                                ? (report.user?.name || report.user?.username || "Anónimo") 
                                                : (report.user || "Anónimo")
                                            }
                                        </div>
                                        <div className="flex items-center text-xs text-gray-400 font-medium">
                                            <span className="mr-1.5">📅</span> {report.date ? new Date(report.date).toLocaleDateString() : 'Sin fecha'}
                                        </div>
                                        <div className={`ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold ${report.status === 'Resuelto' ? 'bg-green-100 text-green-700' :
                                                report.status === 'En Progreso' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {report.status || 'Pendiente'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">No se encontraron reportes que coincidan con tu búsqueda.</p>
                    </div>
                )}
            </div>

            <ReportModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                report={selectedReport}
            />
        </div>
    );
};