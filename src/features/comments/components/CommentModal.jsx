import { useState } from "react";
import { useDeleteComment } from "../hooks/useDeleteComment.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const CommentModal = ({ isOpen, onClose, comment }) => {
    const { removeComment } = useDeleteComment();
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen || !comment) return null;

    const internalDelete = () => {
        showConfirmToast({
            title: "¿Eliminar comentario?",
            message: "Esta acción no se puede deshacer.",
            onConfirm: async () => {
                setIsDeleting(true);
                try {
                    await removeComment(comment._id || comment.id);
                    showSuccess("Comentario eliminado correctamente");
                    onClose(); // Cerramos el modal tras el éxito
                } catch (error) {
                    showError("No se pudo eliminar el comentario");
                } finally {
                    setIsDeleting(false);
                }
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                {/* Header con degradado */}
                <div
                    className="p-6 text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">Detalle del Comentario</h2>
                        <button
                            onClick={onClose}
                            className="text-3xl text-[#EADDCA] hover:text-white transition-transform hover:rotate-90"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    {/* Info del Usuario */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#FDF8F3] border-2 border-[#EADDCA] flex items-center justify-center text-[#8B4513] text-2xl font-black shadow-sm uppercase">
                            {comment.userName?.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#4A3728]">{comment.userName}</h3>
                            <p className="text-sm text-[#D2B48C] font-medium">
                                {comment.date ? new Date(comment.date).toLocaleString() : 'Fecha no disponible'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Reporte Relacionado</label>
                            <div className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm">
                                {comment.reportTitle || "N/A"}
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Contenido</label>
                            <div className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#6F4E37] text-sm leading-relaxed min-h-[120px] whitespace-pre-wrap">
                                {comment.comment}
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-[#EADDCA]/30">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 rounded-xl bg-[#FDF8F3] text-[#8B4513] hover:bg-[#EADDCA] transition font-bold text-xs uppercase tracking-widest"
                        >
                            Cerrar
                        </button>
                        <button
                            onClick={internalDelete}
                            disabled={isDeleting}
                            className="px-8 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow-lg shadow-red-200 font-bold text-xs uppercase tracking-widest disabled:opacity-50"
                        >
                            {isDeleting ? "Eliminando..." : "Eliminar Comentario"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};