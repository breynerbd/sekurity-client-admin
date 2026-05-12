import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions.js";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const UserModal = ({ isOpen, onClose, user }) => {
    const { handleToggleStatus } = useUserActions();
    const [isUpdating, setIsUpdating] = useState(false);

    if (!isOpen || !user) return null;

    const onToggleStatusModal = async () => {
        setIsUpdating(true);
        try {
            await handleToggleStatus(user._id || user.id);
            showSuccess(`Estado del usuario actualizado correctamente`);
            onClose();
        } catch (error) {
            showError("No se pudo procesar el cambio de estado");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 border border-gray-100">

                {/* HEADER MINIMALISTA */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h2 className="text-xl font-bold text-gray-800">Perfil de Usuario</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {/* AVATAR Y DATOS BÁSICOS */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50/50 rounded-3xl border border-gray-100 shadow-inner">
                        <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-200 mb-4 border-4 border-white">
                            {user.name?.charAt(0)}
                        </div>
                        <h3 className="text-2xl font-black text-gray-900">{user.name}</h3>
                        <p className="text-gray-500 font-medium mb-3">{user.email}</p>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${user.role === 'Moderador' ? 'bg-purple-600 text-white shadow-lg shadow-purple-100' : 'bg-blue-600 text-white shadow-lg shadow-blue-100'}`}>
                            {user.role}
                        </span>
                        <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest italic">Miembro desde {user.joinDate || "2026"}</p>
                    </div>

                    {/* MÉTRICAS DE ACTIVIDAD */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
                            <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Reportes Creados</p>
                            <p className="text-3xl font-bold text-blue-600">{user.reportsCount || 0}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
                            <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Comentarios</p>
                            <p className="text-3xl font-bold text-blue-600">{user.commentsCount || 0}</p>
                        </div>
                    </div>

                    {/* ACCIONES */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
                        <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all text-sm">
                            Cerrar
                        </button>
                        <button
                            disabled={isUpdating}
                            onClick={onToggleStatusModal}
                            className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-white transition-all shadow-xl text-[11px] disabled:opacity-50 flex items-center gap-2 ${user.status === 'Activo'
                                    ? 'bg-red-600 hover:bg-red-700 shadow-red-200'
                                    : 'bg-green-600 hover:bg-green-700 shadow-green-200'
                                }`}
                        >
                            {isUpdating && <div className="w-3 h-3 border-2 border-white border-t-transparent animate-spin rounded-full"></div>}
                            {user.status === 'Activo' ? 'Desactivar Cuenta' : 'Activar Cuenta'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};