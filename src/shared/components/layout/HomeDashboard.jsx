import React, { useState, useEffect } from 'react';
import {
    HiOutlineMap,
    HiOutlineDocumentText,
    HiOutlineChatAlt2,
    HiOutlineUsers,
    HiOutlineStar,
    HiTrendingUp,
    HiOutlineRefresh,
    HiOutlineExclamation,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineArrowRight
} from "react-icons/hi";
import { axiosAdmin } from '../../../shared/api/api.js';

const StatCard = ({ title, count, icon: Icon, colorClass }) => (
    <div className="bg-white p-5 lg:p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center gap-4 lg:gap-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className={`p-3.5 lg:p-4 rounded-2xl ${colorClass} transition-transform duration-300 hover:scale-110`}>
            <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-gray-400 text-[10px] lg:text-[11px] font-extrabold uppercase tracking-[0.15em] mb-1 truncate">{title}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
                    {count.toLocaleString()}
                </h3>
                <span className="text-emerald-600 text-xs font-bold flex items-center">
                    <HiTrendingUp className="w-3 h-3 mr-0.5" /> Activo
                </span>
            </div>
        </div>
    </div>
);

const StatCardSkeleton = () => (
    <div className="bg-white p-5 lg:p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center gap-4 lg:gap-5 animate-pulse">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl" />
        <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-6 bg-gray-100 rounded w-3/4" />
        </div>
    </div>
);

export const HomeDashboard = () => {
    const [stats, setStats] = useState({
        zones: 0, reports: 0, comments: 0, users: 0, ratings: 0
    });
    const [recentReports, setRecentReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setErrorMsg(null);

            const [
                zonesRes,
                usersRes,
                reportsRes,
                commentsRes,
                ratingsRes
            ] = await Promise.allSettled([
                axiosAdmin.get('/zones'),
                axiosAdmin.get('/users'),
                axiosAdmin.get('/reports'),
                axiosAdmin.get('/comments'),
                axiosAdmin.get('/ratings')
            ]);

            const extractData = (res, key) => {
                if (res.status !== 'fulfilled') return 0;
                const data = res.value.data;
                if (Array.isArray(data)) return data.length;
                if (Array.isArray(data[key])) return data[key].length;
                if (typeof data.total === 'number') return data.total;
                return 0;
            };

            // Extraer lista de reportes recientes (tomando los primeros 5)
            let reportsList = [];
            if (reportsRes.status === 'fulfilled') {
                const data = reportsRes.value.data;
                const rawReports = Array.isArray(data) ? data : (data.reports || []);
                reportsList = rawReports.slice(0, 5); // últimos 5
            }

            setStats({
                zones: extractData(zonesRes, 'zones'),
                users: extractData(usersRes, 'users'),
                reports: extractData(reportsRes, 'reports'),
                comments: extractData(commentsRes, 'comments'),
                ratings: extractData(ratingsRes, 'ratings')
            });

            setRecentReports(reportsList);

        } catch (error) {
            console.error("Error cargando estadísticas generales:", error);
            setErrorMsg("No se pudieron cargar las estadísticas del sistema.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const cards = [
        { id: 1, title: "Zonas", count: stats.zones, icon: HiOutlineMap, colorClass: "bg-blue-50 text-blue-600" },
        { id: 2, title: "Reportes", count: stats.reports, icon: HiOutlineDocumentText, colorClass: "bg-rose-50 text-rose-600" },
        { id: 3, title: "Comentarios", count: stats.comments, icon: HiOutlineChatAlt2, colorClass: "bg-amber-50 text-amber-600" },
        { id: 4, title: "Usuarios", count: stats.users, icon: HiOutlineUsers, colorClass: "bg-purple-50 text-purple-600" },
        { id: 5, title: "Calificaciones", count: stats.ratings, icon: HiOutlineStar, colorClass: "bg-emerald-50 text-emerald-600" },
    ];

    const getStatusBadge = (status) => {
        const normalized = String(status || "").toUpperCase();
        if (normalized.includes("PEND")) {
            return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"><HiOutlineClock className="w-3.5 h-3.5" /> Pendiente</span>;
        }
        if (normalized.includes("PROG") || normalized.includes("PROCES")) {
            return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200"><HiOutlineRefresh className="w-3.5 h-3.5 animate-spin" /> En Proceso</span>;
        }
        if (normalized.includes("RESOLV") || normalized.includes("COMPLET")) {
            return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"><HiOutlineCheckCircle className="w-3.5 h-3.5" /> Resuelto</span>;
        }
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200">{status || "Desconocido"}</span>;
    };

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Header del Panel y Acciones Directas */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div>
                    <span className="text-blue-600 font-extrabold text-xs tracking-wider uppercase">Panel de Control</span>
                    <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
                        PANEL ADMINISTRATIVO
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Resumen general de la actividad y métricas clave de la plataforma.
                    </p>
                </div>

                {/* Accesos Directos / Filtros Rápidos */}
                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        onClick={fetchData}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all"
                        title="Actualizar datos"
                    >
                        <HiOutlineRefresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Actualizar
                    </button>
                    <span className="inline-flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        <span className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                        Sistema en Línea
                    </span>
                </div>
            </div>

            {/* Mensaje de Error si ocurre */}
            {errorMsg && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium flex items-center gap-2">
                    <HiOutlineExclamation className="w-5 h-5 flex-shrink-0" />
                    {errorMsg}
                </div>
            )}

            {/* Cuadros de Estadísticas */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
                    {[...Array(5)].map((_, i) => (
                        <StatCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
                    {cards.map(card => (
                        <StatCard key={card.id} {...card} />
                    ))}
                </div>
            )}

            {/* Sección de Actividad Reciente */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-gray-900">Reportes Recientes</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Últimas incidencias ingresadas al sistema</p>
                    </div>
                </div>

                {loading ? (
                    <div className="py-8 text-center text-gray-400 text-sm animate-pulse">
                        Cargando actividad reciente...
                    </div>
                ) : recentReports.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 text-[11px] font-black uppercase tracking-wider text-gray-400">
                                    <th className="pb-3 font-extrabold">Título / Incidente</th>
                                    <th className="pb-3 font-extrabold">Tipo</th>
                                    <th className="pb-3 font-extrabold">Estado</th>
                                    <th className="pb-3 font-extrabold text-right">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {recentReports.map((report) => (
                                    <tr key={report.id || report._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-3.5 pr-4">
                                            <span className="font-bold text-gray-900 block truncate max-w-xs">
                                                {report.title || "Sin título"}
                                            </span>
                                            <span className="text-xs text-gray-400 block truncate max-w-xs">
                                                {report.description || "Sin descripción"}
                                            </span>
                                        </td>
                                        <td className="py-3.5 pr-4 text-gray-600 font-medium text-xs">
                                            {report.incident_type || "General"}
                                        </td>
                                        <td className="py-3.5 pr-4">
                                            {getStatusBadge(report.status)}
                                        </td>
                                        <td className="py-3.5 text-right text-gray-400 text-xs font-medium">
                                            {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-400 text-sm">
                        No hay reportes recientes registrados.
                    </div>
                )}
            </div>
        </div>
    );
};