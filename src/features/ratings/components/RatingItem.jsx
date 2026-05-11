import { useState } from "react";
import { useRatingStore } from "../store/useRatingStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const RatingItem = ({ item }) => {
    const { deleteRating, getRatings } = useRatingStore();
    const [isDeleting, setIsDeleting] = useState(false);

    // Lógica para calcular el ancho de las barras de estrellas
    const getWidth = (votes) => {
        const total = item.totalRatings || 1;
        return `${(votes / total) * 100}%`;
    };

    const handleDelete = (e) => {
        e.stopPropagation();

        showConfirmToast({
            title: "¿Eliminar registro de calificación?",
            message: "Se eliminarán las estadísticas acumuladas de este reporte. Esta acción no se puede deshacer.",
            onConfirm: async () => {
                setIsDeleting(true);
                try {
                    await deleteRating(item._id || item.id);
                    showSuccess("Calificación eliminada correctamente");
                    await getRatings();
                } catch (error) {
                    showError("No se pudo eliminar el registro");
                } finally {
                    setIsDeleting(false);
                }
            }
        });
    };

    return (
        <div className="p-8 hover:bg-[#FDF8F3]/40 transition-colors group relative">

            {/* Cabecera del Item */}
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-[#4A3728] group-hover:text-[#8B4513] transition-colors">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#D2B48C]"></span>
                        <p className="text-sm text-[#D2B48C] font-bold uppercase tracking-tighter">
                            {item.zone}
                        </p>
                    </div>
                </div>

                {/* Botón de eliminar dinámico (Solo aparece al hacer hover, igual que en la lista de comentarios) */}
                <div className="flex items-start gap-4">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="opacity-0 group-hover:opacity-100 transition-all text-red-400 hover:text-red-600 p-2 disabled:opacity-30"
                        title="Eliminar estadísticas"
                    >
                        {isDeleting ? "⏳" : "🗑️"}
                    </button>

                    <div className="bg-white px-5 py-3 rounded-2xl border-2 border-[#EADDCA] shadow-sm flex flex-col items-center min-w-[100px]">
                        <span className="text-[#8B4513] font-black text-2xl">{item.average} ★</span>
                        <span className="text-[9px] text-[#D2B48C] font-black uppercase tracking-tighter">
                            {item.totalRatings} Votos
                        </span>
                    </div>
                </div>
            </div>

            {/* Distribución de Estrellas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                    const votes = item.distribution?.[star] || 0;
                    return (
                        <div key={star} className="flex items-center gap-4">
                            <div className="flex items-center gap-1 w-12">
                                <span className="text-xs font-black text-[#8B4513]">{star}</span>
                                <span className="text-amber-400 text-xs">★</span>
                            </div>
                            <div className="flex-1 h-2.5 bg-[#FDF8F3] rounded-full overflow-hidden border border-[#EADDCA]/30">
                                <div
                                    className="h-full bg-gradient-to-r from-[#D2B48C] to-[#8B4513] rounded-full transition-all duration-700 ease-out"
                                    style={{ width: getWidth(votes) }}
                                ></div>
                            </div>
                            <span className="text-[10px] font-bold text-[#D2B48C] w-8 text-right">
                                {votes}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};