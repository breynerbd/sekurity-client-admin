import { useEffect } from "react";
import { useRatings } from "../hooks/useRatings";
import { RatingItem } from "./RatingItem.jsx";
import { useRatingStore } from "../store/useRatingStore.js";
import { showError } from "../../../shared/utils/toast.js";

export const Ratings = () => {
    const { ratings, loading, stats, setSortBy, refresh } = useRatings();
    const error = useRatingStore((state) => state.error);


    useEffect(() => {
        refresh();
    }, [refresh]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    if (loading && ratings.length === 0) {
        return (
            <div className="p-20 text-center text-[#D2B48C] animate-pulse font-bold">
                Cargando analíticas...
            </div>
        );
    }

    return (
        <div className="w-full font-sans p-4">
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                    Calificaciones de Reportes
                </h1>
                <div className="h-1.5 w-16 bg-[#8B4513] mt-2 rounded-full"></div>
                <p className="text-[#6F4E37] mt-3 font-medium text-sm">
                    Analiza las calificaciones y feedback de los usuarios
                </p>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon="⭐" label="Calificación Promedio" value={`${stats.avg} ★`} color="blue" />
                <StatCard icon="📈" label="Total Calificaciones" value={stats.total} color="green" />
                <StatCard icon="📄" label="Mejor Calificado" value={stats.best} color="amber" isTruncated />
            </div>

            {/* SELECTOR DE ORDENAMIENTO */}
            <div className="flex items-center gap-3 mb-8 bg-[#FDF8F3] p-4 rounded-2xl w-fit border border-[#EADDCA]/50">
                <span className="text-[10px] font-black text-[#D2B48C] uppercase tracking-[0.15em] italic">
                    📊 Ordenar por:
                </span>
                <select
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-sm font-bold text-[#4A3728] outline-none cursor-pointer hover:text-[#8B4513] transition"
                >
                    <option value="highest">Mayor calificación</option>
                    <option value="lowest">Menor calificación</option>
                    <option value="most_voted">Más votados</option>
                </select>
            </div>

            {/* LISTADO */}
            <div className="bg-white rounded-[2rem] shadow-xl border border-[#EADDCA]/50 overflow-hidden divide-y divide-[#EADDCA]/30">
                {ratings.length > 0 ? (
                    ratings.map((item) => (
                        <RatingItem key={item._id || item.id} item={item} />
                    ))
                ) : (
                    <div className="p-20 text-center text-[#D2B48C] italic">
                        No hay datos de calificación disponibles.
                    </div>
                )}
            </div>
        </div>
    );
};

// Sub-componente interno para las cards de stats
const StatCard = ({ icon, label, value, color, isTruncated }) => (
    <div className="bg-white p-6 rounded-[24px] border border-[#EADDCA]/30 shadow-sm flex items-center gap-5">
        <div className={`w-14 h-14 rounded-2xl bg-${color}-50 flex items-center justify-center text-2xl border border-${color}-100`}>
            {icon}
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black text-[#D2B48C] uppercase tracking-widest">{label}</p>
            <p className={`text-xl font-bold text-[#4A3728] ${isTruncated ? "truncate" : ""}`}>
                {value || "---"}
            </p>
        </div>
    </div>
);