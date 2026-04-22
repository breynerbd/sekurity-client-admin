import { useState } from "react";
import { CommentModal } from "./CommentModal.jsx";

export const Comments = ({ comments = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    const handleViewComment = (comment) => {
        setSelectedComment(comment);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4">
            {/* HEADER  */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-main-blue">
                        Gestión de Comentarios
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Modera y supervisa los comentarios de los usuarios
                    </p>
                </div>
            </div>

            {/* SEARCH BAR */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar comentarios..."
                        className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
            </div>

            {/* LIST CONTAINER */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">
                        Comentarios ({comments.length})
                    </h2>
                </div>

                <div className="divide-y divide-gray-100">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div
                                key={comment.id}
                                onClick={() => handleViewComment(comment)}
                                className="p-5 flex gap-4 hover:bg-blue-50/50 transition cursor-pointer group"
                            >
                                {/* Avatar Dinámico */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-main-blue flex items-center justify-center text-white font-bold">
                                        {comment.userName?.charAt(0) || "U"}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-gray-900">{comment.userName}</span>
                                            <span className="text-gray-300 text-xs">•</span>
                                            <span className="text-xs text-gray-500">📅 {comment.date}</span>
                                        </div>
                                        <button className="text-red-500 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-50 rounded">
                                            🗑️
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-1 mt-1 text-xs font-medium text-gray-400">
                                        <span>💬 {comment.reportTitle}</span>
                                    </div>

                                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                                        {comment.comment}
                                    </p>

                                    <div className="flex items-center gap-1 mt-3 text-amber-500 text-sm">
                                        👍 <span className="font-semibold">{comment.likes} Me gusta</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-10 text-center text-gray-400">
                            No hay comentarios para mostrar.
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL */}
            <CommentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                comment={selectedComment}
            />
        </div>
    );
};