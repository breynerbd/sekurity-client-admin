import { useState } from "react";
import { useRatingStore } from "../store/useRatingStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const RatingItem = ({ item }) => {
    const { deleteRating, getRatings } = useRatingStore();
    const [isDeleting, setIsDeleting] = useState(false);

    const getWidth = (votes) => {
        const total = item.totalRatings || 1;
        return `${(votes / total) * 100}%`;
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        showConfirmToast({
            title: "¿Resetear métricas?",
            message: "Se purgarán los datos acumulados de este reporte. Esta acción es irreversible.",
            onConfirm: async () => {
                setIsDeleting(true);
                try {
                    await deleteRating(item._id || item.id);
                    showSuccess("Registro depurado con éxito");
                    await getRatings();
                } catch (error) {
                    showError("Error en la operación de purga");
                } finally {
                    setIsDeleting(false);
                }
            }
        });
    };

    return (
        <div className="p-6 md:p-8 hover:bg-blue-50/30 transition-all group relative">

            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                {/* INFO IZQUIERDA */}
                <div className="space-y-3 w-full md:w-auto">
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors tracking-tight">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            Zona de Origen
                        </span>
                        <p className="text-xs text-blue-600 font-bold tracking-tighter">
                            {item.zone}
                        </p>
                    </div>
                </div>

                {/* ACCIONES Y PROMEDIO */}
                <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="md:opacity-0 group-hover:opacity-100 transition-all text-gray-400 hover:text-red-600 p-2.5 bg-white border border-gray-100 hover:border-red-100 rounded-xl shadow-sm"
                    >
                        {isDeleting ? (
                            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent animate-spin rounded-full"></div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        )}
                    </button>

                    <div className="bg-white px-5 py-3 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center min-w-[110px] ring-4 ring-blue-50/50">
                        <span className="text-blue-600 font-black text-2xl tracking-tighter leading-none">{item.average}</span>
                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider mt-1">
                            {item.totalRatings} Votos
                        </span>
                    </div>
                </div>
            </div>

            {/* BARRAS DE DISTRIBUCIÓN RESPONSIVAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                    const votes = item.distribution?.[star] || 0;
                    return (
                        <div key={star} className="flex items-center gap-3 group/bar">
                            <div className="flex items-center gap-1 w-10 shrink-0">
                                <span className="text-xs font-black text-gray-700">{star}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.48-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                                    style={{ width: getWidth(votes) }}
                                ></div>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 w-8 text-right tabular-nums">
                                {votes}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};