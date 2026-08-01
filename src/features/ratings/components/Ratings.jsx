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
            <div className="p-8 text-center animate-pulse">
                <div className="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="font-bold tracking-wider uppercase text-[9px] text-gray-400">
                    Cargando métricas...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in p-3 md:p-5">
            {/* Cabecera compacta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                <div>
                    <h2 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">
                        Calificaciones de reportes
                    </h2>
                    <p className="text-gray-500 text-xs font-medium">
                        Monitorea el feedback y la reputación de seguridad.
                    </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        Ordenar:
                    </span>
                    <select
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white text-xs font-bold text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 shadow-sm"
                    >
                        <option value="highest">Mayor calificación</option>
                        <option value="lowest">Menor calificación</option>
                        <option value="most_voted">Más votados</option>
                    </select>
                </div>
            </div>

            {/* Estadísticas ultra compactas (Tipo banner horizontal) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <StatCard
                    label="Promedio"
                    value={stats.avg ? `${Number(stats.avg).toFixed(1)} ★` : "---"}
                    color="text-blue-600"
                />
                <StatCard
                    label="Total de votos"
                    value={stats.total || 0}
                    color="text-indigo-600"
                />
                <StatCard
                    label="Mejor valorado"
                    value={stats.best || "---"}
                    color="text-cyan-600"
                    isTruncated
                />
            </div>

            {/* Listado de items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                {ratings.length > 0 ? (
                    ratings.map((item, index) => (
                        <RatingItem key={item.report_id || item.id || index} item={item} />
                    ))
                ) : (
                    <div className="p-10 text-center text-gray-400 italic text-xs font-medium">
                        No hay datos de calificación disponibles.
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ label, value, color, isTruncated }) => (
    <div className="bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{label}</span>
        <span className={`text-base font-extrabold tracking-tight ${color} ${isTruncated ? "truncate max-w-[150px]" : ""}`}>
            {value}
        </span>
    </div>
);