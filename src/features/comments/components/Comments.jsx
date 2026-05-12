import { useState, useEffect } from "react";
import { CommentModal } from "./CommentModal.jsx";
import { useCommentStore } from "../store/useCommentStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Comments = () => {
    const { comments, loading, error, getComments, deleteComment } = useCommentStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getComments();
    }, [getComments]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleViewComment = (comment) => {
        setSelectedComment(comment);
        setIsModalOpen(true);
    };

    const handleDelete = (e, commentId) => {
        e.stopPropagation();
        showConfirmToast({
            title: "¿Eliminar comentario?",
            message: "Esta acción es irreversible y afectará la visibilidad del reporte.",
            onConfirm: async () => {
                try {
                    await deleteComment(commentId);
                    showSuccess("Comentario eliminado correctamente");
                } catch (err) {
                    showError(err.message);
                }
            }
        });
    };

    const filteredComments = comments.filter(c =>
        c.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.userName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-6xl mx-auto animate-fade-in p-4 md:p-8">
            {/* HEADER ALINEADO A LA IZQUIERDA */}
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Moderación de Comentarios
                </h2>
                <div className="h-1.5 w-16 bg-blue-600 mt-2 rounded-full"></div>
                <p className="text-gray-500 mt-3 font-medium text-sm md:text-base">
                    Supervisa las interacciones de los usuarios en Sekurity.
                </p>
            </div>

            {/* FILTROS Y BÚSQUEDA */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por usuario o mensaje..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    />
                </div>
                <div className="hidden md:flex px-4 py-2 bg-blue-50 text-blue-600 rounded-xl">
                    <span className="text-xs font-bold uppercase tracking-wider">
                        {filteredComments.length} Comentarios
                    </span>
                </div>
            </div>

            {/* LISTA DE COMENTARIOS */}
            <div className="grid grid-cols-1 gap-4">
                {loading && comments.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="animate-spin inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                        <p className="text-gray-500 font-semibold italic">Sincronizando...</p>
                    </div>
                ) : filteredComments.length > 0 ? (
                    filteredComments.map((comment) => (
                        <div
                            key={comment._id || comment.id}
                            onClick={() => handleViewComment(comment)}
                            className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex gap-4 items-start"
                        >
                            {/* AVATAR */}
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex-shrink-0 flex items-center justify-center text-white font-black shadow-lg group-hover:scale-105 transition-transform">
                                {comment.userName?.charAt(0).toUpperCase()}
                            </div>

                            {/* CONTENIDO */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1 gap-2">
                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                        {comment.userName}
                                    </h4>
                                    <button
                                        onClick={(e) => handleDelete(e, comment._id || comment.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-3">
                                    "{comment.comment}"
                                </p>

                                <div className="flex items-center gap-x-4 pt-3 border-t border-gray-50 mt-auto">
                                    <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        <span className="mr-1.5">📅</span> {new Date(comment.date).toLocaleDateString()}
                                    </div>
                                    <div className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                        ID: {(comment._id || comment.id).slice(-6)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">No se encontraron comentarios que coincidan con tu búsqueda.</p>
                    </div>
                )}
            </div>

            <CommentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                comment={selectedComment}
            />
        </div>
    );
};