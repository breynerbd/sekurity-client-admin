import { useState, useEffect } from "react";
import { ReportModal } from "./ReportModal.jsx";
import { useReportStore } from "../store/useReportStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Reports = () => {
    const { reports, loading, error, getReports } = useReportStore();
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

    const filteredReports = reports.filter(r =>
        r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.user?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full p-4">
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                    Gestión de Reportes
                </h1>
                <div className="h-1.5 w-16 bg-[#1d4ed8] mt-2 rounded-full"></div>
                <p className="text-gray-500 mt-3 font-medium text-sm">
                    Administra y supervisa todos los incidentes del sistema
                </p>
            </div>

            {/* FILTERS BAR */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por título o usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
            </div>

            {/* LIST CONTAINER */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center text-blue-500 italic">Cargando reportes...</div>
                ) : (
                    <>
                        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                            <h3 className="font-bold text-gray-800">Reportes ({filteredReports.length})</h3>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {filteredReports.map((report) => (
                                <div key={report._id || report.id} className="p-6 hover:bg-gray-50/50 transition group cursor-pointer" onClick={() => handleViewReport(report)}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="text-lg font-bold text-gray-900">{report.title}</h4>
                                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${report.priority === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {report.priority}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-3 line-clamp-1">{report.description}</p>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                                                <span>📍 {report.location}</span>
                                                <span>👤 {report.user}</span>
                                                <span>📅 {new Date(report.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={(e) => handleDelete(e, report._id || report.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
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