import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions.js";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const UserModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    const isActive = user.isActive === true;

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4 overflow-y-auto animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden transform transition-all duration-300 border border-slate-100 ring-1 ring-slate-900/5">

                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Perfil de Usuario</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    <div className="flex flex-col items-center text-center p-6 bg-slate-50/50 rounded-3xl border border-slate-100 shadow-inner relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-2 shadow-sm border ${isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                <span className={`w-2 h-2 rounded-full animate-pulse ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                {isActive ? 'Activo' : 'Inactivo'}
                            </span>
                        </div>

                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-blue-500/20 mb-4 border-4 border-white">
                            {user.name?.charAt(0)}
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h3>
                        <p className="text-slate-500 font-medium text-sm mb-4">{user.email}</p>

                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md ${user.role === 'Moderador' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                            {user.role}
                        </span>

                        <p className="text-[10px] text-slate-400 mt-4 font-extrabold uppercase tracking-widest italic">Miembro desde {user.joinDate || "2026"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 shadow-sm text-center">
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Reportes Creados</p>
                            <p className="text-3xl font-black text-blue-600">{user.reportsCount || 0}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 shadow-sm text-center">
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Comentarios</p>
                            <p className="text-3xl font-black text-indigo-600">{user.commentsCount || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};