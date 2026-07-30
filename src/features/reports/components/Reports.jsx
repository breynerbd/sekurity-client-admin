import { useState, useEffect, useMemo } from "react";
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

    const filteredReports = useMemo(() => {
        return reports.filter(r => {
            const titleMatch = r.title?.toLowerCase().includes(searchTerm.toLowerCase());
            const userName = typeof r.user === 'object' ? (r.user?.name || r.user?.username) : r.user;
            const userMatch = userName?.toLowerCase().includes(searchTerm.toLowerCase());
            return titleMatch || userMatch;
        });
    }, [reports, searchTerm]);

    const getPriorityBadge = (report) => {
        const priority = report.priority || report.severity_level;
        const isHigh = priority === 'Alta' || priority === 'HIGH';
        return (
            <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full uppercase tracking-wider shadow-sm ${isHigh ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                {priority || 'Normal'}
            </span>
        );
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'RESOLVED': { label: 'Resuelto', className: 'bg-emerald-500 text-white shadow-sm' },
            'ACTIVE': { label: 'Activo', className: 'bg-blue-500 text-white shadow-sm' },
            'PENDING': { label: 'Pendiente', className: 'bg-amber-500 text-white shadow-sm' },
            'CANCELLED': { label: 'Cancelado', className: 'bg-gray-500 text-white shadow-sm' },
            'IN_PROGRESS': { label: 'En Progreso', className: 'bg-amber-500 text-white shadow-sm' }
        };

        const currentStatus = statusMap[status] || { label: status || 'Pendiente', className: 'bg-amber-500 text-white shadow-sm' };

        return (
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${currentStatus.className}`}>
                {currentStatus.label}
            </span>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in p-4 md:p-6 lg:p-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Gestión de Reportes
                    </h2>
                    <div className="h-1.5 w-16 bg-blue-600 mt-2 rounded-full"></div>
                    <p className="text-gray-500 mt-3 font-medium text-sm md:text-base">
                        Administra y supervisa todos los incidentes del sistema en tiempo real.
                    </p>
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {filteredReports.filter(r => (r.status || 'ACTIVE') === 'ACTIVE').length}
                    </div>
                    <div className="text-xs">
                        <p className="text-gray-400 font-medium">Total Visibles</p>
                        <p className="text-gray-800 font-bold">Reportes Activos</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                        {filteredReports.filter(r => r.status === 'IN_PROGRESS').length}
                    </div>
                    <div className="text-xs">
                        <p className="text-gray-400 font-medium">Por atender</p>
                        <p className="text-gray-800 font-bold">Reportes Pendientes</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                        {filteredReports.filter(r => r.status === 'RESOLVED').length}
                    </div>
                    <div className="text-xs">
                        <p className="text-gray-400 font-medium">Atendidos</p>
                        <p className="text-gray-800 font-bold">Reportes Resueltos</p>
                    </div>
                </div>
            </div>

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
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm bg-gray-50/50"
                    />
                </div>
            </div>

            <div>
                {loading ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="animate-spin inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                        <p className="text-gray-500 font-semibold italic">Sincronizando reportes...</p>
                    </div>
                ) : filteredReports.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredReports.map((report) => (
                            <div
                                key={report._id || report.id}
                                onClick={() => handleViewReport(report)}
                                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden group"
                            >
                                <div className="w-full h-36 bg-gray-100 relative overflow-hidden">
                                    <MiniMap
                                        lat={report.zone?.latitude || report.latitude}
                                        lng={report.zone?.longitude || report.longitude}
                                    />
                                    <div className="absolute top-3 left-3 z-10">
                                        {getPriorityBadge(report)}
                                    </div>
                                    <div className="absolute top-3 right-3 z-10">
                                        {getStatusBadge(report.status)}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                {report.title}
                                            </h3>
                                            <button
                                                onClick={(e) => handleDelete(e, report._id || report.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"
                                                title="Eliminar reporte"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-6 break-all leading-relaxed">
                                            {report.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-400 font-medium mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                {(typeof report.user === 'object' ? (report.user?.name || report.user?.username) : report.user)?.[0]?.toUpperCase() || "U"}
                                            </div>
                                            <span className="text-gray-700 font-semibold">
                                                {typeof report.user === 'object'
                                                    ? (report.user?.name || report.user?.username || "Anónimo")
                                                    : (report.user || "Anónimo")
                                                }
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'Sin fecha'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">
                            {reports.length === 0 ? "No hay reportes registrados en el sistema." : "No se encontraron reportes que coincidan con tu búsqueda."}
                        </p>
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