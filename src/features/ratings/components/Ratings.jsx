import { useEffect } from "react";
import { useRatings } from "../hooks/useRatings";
import { RatingItem } from "./RatingItem.jsx";
import { useRatingStore } from "../store/useRatingStore.js";
import { showError } from "../../../shared/utils/toast.js";

export const Ratings = () => {
    const { ratings, loading, stats, setSortBy, refresh } = useRatings();
    const error = useRatingStore((state) => state.error);

    useEffect(() => { refresh(); }, [refresh]);

    useEffect(() => { if (error) showError(error); }, [error]);

    if (loading && ratings.length === 0) {
        return (
            <div className="p-20 text-center animate-pulse">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-black tracking-widest uppercase text-[10px] text-gray-400">
                    Sincronizando analíticas de seguridad...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in p-4 md:p-6 lg:p-8">
            {/* HEADER CORREGIDO - ESTILO REPORTS */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Calificaciones de reportes
                    </h2>
                    <div className="h-1.5 w-16 bg-blue-600 mt-2 rounded-full"></div>
                    <p className="text-gray-500 mt-4 font-medium text-sm md:text-base max-w-md">
                        Analiza las calificaciones y el feedback detallado de los usuarios sobre la seguridad.
                    </p>
                </div>

                {/* FILTROS - ESTILO MINIMALISTA */}
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 italic">
                        📊 Ordenar por:
                    </span>
                    <select
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white text-xs font-bold text-gray-700 px-4 py-3 rounded-xl border border-gray-200 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    >
                        <option value="highest">Mayor calificación</option>
                        <option value="lowest">Menor calificación</option>
                        <option value="most_voted">Más votados</option>
                    </select>
                </div>
            </div>

            {/* STATS CARDS RESPONSIVAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
                <StatCard
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.482-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
                    label="Calificación promedio"
                    value={`${stats.avg} ★`}
                    color="blue"
                />
                <StatCard
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                    label="Total calificaciones"
                    value={stats.total}
                    color="indigo"
                />
                <StatCard
                    icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />}
                    label="Mejor calificado"
                    value={stats.best}
                    color="cyan"
                    isTruncated
                />
            </div>

            {/* LISTADO TIPO CARD STACK */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                {ratings.length > 0 ? (
                    ratings.map((item) => (
                        <RatingItem key={item._id || item.id} item={item} />
                    ))
                ) : (
                    <div className="p-20 text-center text-gray-400 italic font-medium">
                        No hay datos de calificación disponibles.
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color, isTruncated }) => (
    <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 md:gap-5 hover:shadow-md transition-shadow">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-${color}-50 flex items-center justify-center text-${color}-600 border border-${color}-100 shrink-0`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {icon}
            </svg>
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-1">{label}</p>
            <p className={`text-lg md:text-xl font-extrabold text-gray-900 tracking-tight ${isTruncated ? "truncate" : ""}`}>
                {value || "---"}
            </p>
        </div>
    </div>
);