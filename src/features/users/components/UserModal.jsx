export const UserModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div
                    className="p-6 text-white flex justify-between items-center"
                    style={{ background: "linear-gradient(90deg, #1d4ed8 0%, #1956a3 100%)" }}
                >
                    <div>
                        <h2 className="text-2xl font-bold">Información del Usuario</h2>
                        <p className="text-blue-100 text-xs mt-1 italic">Miembro desde: {user.joinDate || "2026"}</p>
                    </div>
                    <button onClick={onClose} className="text-2xl hover:scale-110 transition">&times;</button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user.name?.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                            <p className="text-gray-500">{user.email}</p>
                            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${user.role === 'Moderador' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-gray-100 text-center">
                            <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Reportes Creados</p>
                            <p className="text-2xl font-bold text-gray-900">{user.reportsCount || 0}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-100 text-center">
                            <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">Comentarios</p>
                            <p className="text-2xl font-bold text-gray-900">{user.commentsCount || 0}</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t font-sans">
                        <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition">
                            Cerrar
                        </button>
                        <button className={`px-6 py-2.5 rounded-xl font-bold text-white transition shadow-lg ${user.status === 'Activo' ? 'bg-red-500 hover:bg-red-600 shadow-red-100' : 'bg-green-500 hover:bg-green-600 shadow-green-100'
                            }`}>
                            {user.status === 'Activo' ? 'Desactivar Cuenta' : 'Activar Cuenta'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};