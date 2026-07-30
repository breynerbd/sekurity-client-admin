import { useState } from "react";
import { useCommentStore } from "../store/useCommentStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const CommentModal = ({ isOpen, onClose, comment }) => {
    const deleteComment = useCommentStore(state => state.deleteComment);
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen || !comment) return null;

    const commentText = comment.comment || comment.content || comment.message || "Sin contenido";
    const userName = comment.userName || comment.username || (typeof comment.user === 'object' ? (comment.user?.name || comment.user?.username) : comment.user) || "Anónimo";
    const commentDate = comment.date || comment.createdAt || comment.updatedAt;
    const commentId = comment._id || comment.id;

    const reportData = comment.report || comment.reportId;
    const reportTitle = typeof reportData === 'object' && reportData !== null
        ? (reportData.title || "Reporte sin título")
        : (reportData ? `Reporte ID: ${reportData}` : "Reporte general");

    const handleInternalDelete = () => {
        showConfirmToast({
            title: "¿Confirmar eliminación?",
            message: "Esta acción borrará el comentario permanentemente del reporte.",
            onConfirm: async () => {
                setIsDeleting(true);
                try {
                    await deleteComment(commentId);
                    showSuccess("Comentario removido");
                    onClose();
                } catch (error) {
                    showError("No se pudo completar la acción");
                } finally {
                    setIsDeleting(false);
                }
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-md flex justify-center items-center z-[1000] p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-300">

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-200"
                        title="Cerrar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl font-black shadow-inner">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold tracking-tight leading-tight">{userName}</h3>
                            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-blue-100 border border-white/10">
                                Sekurity User
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100/80 relative shadow-sm">
                        <span className="absolute -top-2.5 left-4 bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
                            Contenido del Mensaje
                        </span>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed pt-1 italic font-medium">
                            "{commentText}"
                        </p>
                    </div>

                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/60">
                        <span className="block text-[10px] font-extrabold text-blue-500 uppercase tracking-widest mb-1">Reporte asociado</span>
                        <span className="text-xs md:text-sm font-bold text-gray-800 flex items-center gap-1.5 truncate">
                            <span></span> <span className="truncate">{reportTitle}</span>
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                        <div>
                            <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Fecha de publicación</span>
                            <span className="text-xs md:text-sm font-bold text-gray-800 flex items-center gap-1.5">
                                <span></span> {commentDate ? new Date(commentDate).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' }) : "Fecha desconocida"}
                            </span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Estado</span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Público
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex gap-3 justify-end items-center">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200/60 transition-all text-sm"
                    >
                        Volver
                    </button>
                    <button
                        onClick={handleInternalDelete}
                        disabled={isDeleting}
                        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all duration-200 font-bold text-sm flex items-center gap-2 disabled:opacity-50"
                    >
                        {isDeleting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                                <span>Eliminando...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>Eliminar comentario</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};