import { useState, useEffect } from "react";
import { CommentModal } from "./CommentModal.jsx";
import { useCommentStore } from "../store/useCommentStore.js";
import { useUIStore } from "../../auth/store/uiStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Comments = () => {
    const { comments = [], loading, error, getComments, deleteComment } = useCommentStore();
    const { openConfirm } = useUIStore(); // Hook de tu UIStore

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getComments();
    }, [getComments]);

    // Manejo de errores global del store
    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleViewComment = (comment) => {
        setSelectedComment(comment);
        setIsModalOpen(true);
    };

    const handleDelete = (e, commentId) => {
        e.stopPropagation(); // Evita que se abra el modal al hacer clic en eliminar

        showConfirmToast({
            title: "¿Eliminar comentario?",
            message: "¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer.",
            onConfirm: async () => {
                try {
                    await deleteComment(commentId);
                    showSuccess("Comentario eliminado correctamente");
                    await getComments();
                } catch (err) {
                    showError("No se pudo eliminar el comentario");
                }
            }
        });
    };

    const filteredComments = comments.filter(c =>
        c.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.userName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                        Gestión de Comentarios
                    </h1>
                    <div className="h-1.5 w-16 bg-[#8B4513] mt-2 rounded-full"></div>
                    <p className="text-[#6F4E37] mt-3 font-medium text-sm">
                        Modera y supervisa las opiniones de los clientes
                    </p>
                </div>
            </div>

            {/* SEARCH BAR */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#EADDCA]/50 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por usuario o contenido..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-[#8B4513] transition"
                    />
                    <span className="absolute left-3 top-2.5">🔍</span>
                </div>
            </div>

            {/* LIST CONTAINER */}
            <div className="bg-white rounded-[2rem] shadow-xl border border-[#EADDCA]/50 overflow-hidden">
                <div className="p-6 border-b border-[#EADDCA]/30 bg-[#FDF8F3]">
                    <h2 className="text-lg font-bold text-[#4A3728]">
                        Comentarios Recientes ({filteredComments.length})
                    </h2>
                </div>

                <div className="divide-y divide-[#EADDCA]/30">
                    {loading ? (
                        <div className="p-20 text-center text-[#D2B48C] italic">Cargando comentarios...</div>
                    ) : filteredComments.length > 0 ? (
                        filteredComments.map((comment) => (
                            <div
                                key={comment._id || comment.id}
                                onClick={() => handleViewComment(comment)}
                                className="p-6 flex gap-4 hover:bg-[#FDF8F3]/50 transition cursor-pointer group"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-[#8B4513] flex items-center justify-center text-white font-bold shadow-inner">
                                        {comment.userName?.charAt(0) || "U"}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-bold text-[#4A3728]">{comment.userName}</span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] text-[#D2B48C] uppercase font-black tracking-widest">
                                                    📅 {new Date(comment.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(e, comment._id || comment.id)}
                                            className="text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:text-red-600 p-2"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                    <p className="text-[#6F4E37] mt-3 text-sm leading-relaxed line-clamp-2">
                                        {comment.comment}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-20 text-center text-[#D2B48C] italic">
                            No se encontraron comentarios que coincidan con la búsqueda.
                        </div>
                    )}
                </div>
            </div>

            <CommentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                comment={selectedComment}
            />
        </div>
    );
};