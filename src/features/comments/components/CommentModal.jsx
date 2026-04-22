export const CommentModal = ({ isOpen, onClose, comment }) => {
    if (!isOpen || !comment) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header dinámico con tu degradado */}
                <div
                    className="p-5 text-white"
                    style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Detalle del Comentario</h2>
                        <button onClick={onClose} className="hover:rotate-90 transition-transform text-2xl">&times;</button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* User Header */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-main-blue text-2xl font-bold border-2 border-white shadow-sm">
                            {comment.userName?.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{comment.userName}</h3>
                            <p className="text-sm text-gray-500">{comment.date}</p>
                        </div>
                    </div>

                    {/* Inputs de solo lectura o edición */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Reporte Relacionado</label>
                            <input
                                readOnly
                                value={comment.reportTitle}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Comentario del Usuario</label>
                            <textarea
                                readOnly
                                rows="4"
                                value={comment.comment}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition font-medium"
                        >
                            Cerrar
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow-md">
                            Eliminar Comentario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};