import { useState } from "react";
import { useCommentStore } from "../store/useCommentStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";

export const CommentModal = ({ isOpen, onClose, comment }) => {
    const deleteComment = useCommentStore(state => state.deleteComment);
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen || !comment) return null;

    const handleInternalDelete = () => {
        showConfirmToast({
            title: "¿Confirmar eliminación?",
            message: "Esta acción borrará el comentario permanentemente del reporte.",
            onConfirm: async () => {
                setIsDeleting(true);
                try {
                    await deleteComment(comment._id || comment.id);
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
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center z-[1000] p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* BARRA DE COLOR SUPERIOR */}
                <div className="h-2 bg-blue-600 w-full"></div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl font-black">
                                {comment.userName?.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">{comment.userName}</h3>
                                <p className="text-xs font-bold text-blue-500 uppercase tracking-tighter">Usuario de KinalSport</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 relative">
                            <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                Contenido del Mensaje
                            </label>
                            <p className="text-gray-700 text-sm leading-relaxed italic">
                                "{comment.comment}"
                            </p>
                        </div>

                        <div className="flex justify-between items-center px-2">
                            <div>
                                <span className="block text-[10px] font-bold text-gray-400 uppercase">Fecha de publicación</span>
                                <span className="text-sm font-bold text-gray-700">
                                    {new Date(comment.date).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase">Estado</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                    Público
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all text-sm"
                        >
                            Volver
                        </button>
                        <button
                            onClick={handleInternalDelete}
                            disabled={isDeleting}
                            className="flex-[1.5] py-3.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold text-sm flex items-center justify-center gap-2"
                        >
                            {isDeleting ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full"></div>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    Eliminar de la plataforma
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};