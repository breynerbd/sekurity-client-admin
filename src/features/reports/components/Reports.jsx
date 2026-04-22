import { useState } from "react";
import { ReportModal } from "./ReportModal.jsx";

export const Reports = ({ reports = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleViewReport = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full">
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Reportes</h1>
                <p className="text-gray-500 text-sm">Administra y supervisa todos los reportes del sistema</p>
            </div>

            {/* FILTERS BAR */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar reportes..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
                        󰈲
                    </button>
                    <select className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none">
                        <option>Todos los estados</option>
                        <option>Pendiente</option>
                        <option>En Progreso</option>
                        <option>Resuelto</option>
                    </select>
                </div>
            </div>

            {/* REPORTS LIST */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                    <h3 className="font-bold text-gray-800">Reportes ({reports.length})</h3>
                </div>

                <div className="divide-y divide-gray-50">
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <div key={report.id} className="p-6 hover:bg-gray-50/50 transition group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-lg font-bold text-gray-900">{report.title}</h4>
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${report.priority === 'Alta' ? 'bg-red-100 text-red-600' :
                                                report.priority === 'Media' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {report.priority}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-3">{report.description}</p>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">📍 {report.location}</span>
                                            <span className="text-gray-200">|</span>
                                            <span className="flex items-center gap-1">👤 Reportado por: {report.user}</span>
                                            <span className="text-gray-200">|</span>
                                            <span>📅 {report.date}</span>
                                            <span className="text-gray-200">|</span>
                                            <span className="flex items-center gap-1 text-amber-500 font-medium">
                                                Rating: {report.rating} ★
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 ${report.status === 'Pendiente' ? 'bg-amber-50 text-amber-600' :
                                            report.status === 'En Progreso' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                            <span className="w-2 h-2 rounded-full bg-current"></span>
                                            {report.status}
                                        </span>
                                        <button
                                            onClick={() => handleViewReport(report)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        >
                                            👁️
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-400 italic">No hay reportes disponibles.</div>
                    )}
                </div>
            </div>

            <ReportModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                report={selectedReport}
            />
        </div>
    );
};