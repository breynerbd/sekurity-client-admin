import { useState, useEffect, useMemo } from "react";
import { UserModal } from "./UserModal.jsx";
import { useUserStore } from "../store/useUserStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Users = () => {
    const { users = [], loading, error, getUsers, toggleUserStatus } = useUserStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const stats = useMemo(() => [
        { label: "Activos", count: users.filter(u => u.isActive === true).length, icon: "👥", color: "text-emerald-600", bg: "bg-emerald-50/80", ring: "group-hover:ring-emerald-500/20" },
        { label: "Inactivos", count: users.filter(u => u.isActive === false).length, icon: "👤", color: "text-slate-500", bg: "bg-slate-100/80", ring: "group-hover:ring-slate-500/20" },
        { label: "Moderadores", count: users.filter(u => u.role === 'Moderador').length, icon: "🛡️", color: "text-indigo-600", bg: "bg-indigo-50/80", ring: "group-hover:ring-indigo-500/20" },
    ], [users]);

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const onToggleStatus = (e, user) => {
        e.stopPropagation();
        const currentlyActive = user.isActive === true;
        const targetActionLabel = currentlyActive ? 'desactivar' : 'activar';

        showConfirmToast({
            title: `¿${targetActionLabel} usuario?`,
            message: `¿Estás seguro de que deseas ${targetActionLabel} a ${user.name}?`,
            onConfirm: async () => {
                try {
                    const userId = user._id || user.id;
                    await toggleUserStatus(userId, currentlyActive);
                    showSuccess(`Usuario ${currentlyActive ? 'desactivado' : 'activado'} correctamente`);
                } catch (err) {
                    showError("No se pudo cambiar el estado");
                }
            }
        });
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in p-4 md:p-8">

            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Control de Usuarios
                    </h2>
                    <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 mt-2 rounded-full"></div>
                    <p className="text-slate-500 mt-3 font-medium text-sm md:text-base">
                        Gestiona privilegios, roles y estados de las cuentas registradas.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className={`group relative bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-100/80 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-transparent ring-1 ring-slate-900/5 ${stat.ring}`}>
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center text-xl shadow-inner transition-transform duration-300 group-hover:scale-110`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-slate-100/80 flex gap-4 mb-8 ring-1 ring-slate-900/5">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o correo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/80 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium text-slate-800 placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="bg-transparent rounded-2xl overflow-hidden">
                <div className="hidden md:block bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-100/80 overflow-hidden ring-1 ring-slate-900/5">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/75 text-[10px] uppercase tracking-widest text-slate-400 font-extrabold border-b border-slate-100">
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Rol</th>
                                <th className="px-6 py-4 text-center">Actividad</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80">
                            {!loading && filteredUsers.map((user) => (
                                <tr
                                    key={user._id || user.id}
                                    className="hover:bg-blue-50/30 transition-all duration-200 group cursor-pointer"
                                    onClick={() => handleViewUser(user)}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                                {user.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm ${user.role === 'Moderador' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-4 text-xs font-bold text-slate-600">
                                            <div className="flex flex-col items-center bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                                                <span className="text-blue-600 font-black">{user.reportsCount || 0}</span>
                                                <span className="text-[9px] text-slate-400 uppercase tracking-wider">Rep</span>
                                            </div>
                                            <div className="flex flex-col items-center bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                                                <span className="text-indigo-600 font-black">{user.commentsCount || 0}</span>
                                                <span className="text-[9px] text-slate-400 uppercase tracking-wider">Com</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2 w-fit shadow-sm ${user.isActive === true ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                            <span className={`w-2 h-2 rounded-full animate-pulse ${user.isActive === true ? 'bg-emerald-500 shadow-sm shadow-emerald-500' : 'bg-slate-400'}`}></span>
                                            {user.isActive === true ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => onToggleStatus(e, user)}
                                            className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all duration-200 shadow-sm active:scale-95 ${user.isActive === true ? 'border-slate-200 bg-white text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50' : 'border-emerald-200 bg-emerald-50/50 text-emerald-600 hover:bg-emerald-100'}`}
                                        >
                                            {user.isActive === true ? 'Desactivar' : 'Activar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden space-y-4">
                    {!loading && filteredUsers.map((user) => (
                        <div
                            key={user._id || user.id}
                            onClick={() => handleViewUser(user)}
                            className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100/80 shadow-sm flex flex-col gap-4 ring-1 ring-slate-900/5 active:scale-[0.99] transition-transform"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-md shadow-blue-500/20">
                                    {user.name?.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-900 truncate">{user.name}</h4>
                                    <p className="text-xs text-slate-400 font-medium truncate">{user.email}</p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${user.role === 'Moderador' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-100/80">
                                <div className="flex gap-2">
                                    <div className="text-center bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                                        <p className="text-xs font-black text-blue-600">{user.reportsCount || 0}</p>
                                        <p className="text-[9px] text-slate-400 uppercase font-extrabold tracking-wider">Reports</p>
                                    </div>
                                    <div className="text-center bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                                        <p className="text-xs font-black text-indigo-600">{user.commentsCount || 0}</p>
                                        <p className="text-[9px] text-slate-400 uppercase font-extrabold tracking-wider">Comments</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => onToggleStatus(e, user)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-sm ${user.isActive === true ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100'}`}
                                >
                                    {user.isActive === true ? 'Desactivar' : 'Activar'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {loading && (
                    <div className="p-20 text-center flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 font-medium text-sm italic">Sincronizando base de datos...</p>
                    </div>
                )}
                {!loading && filteredUsers.length === 0 && (
                    <div className="p-20 text-center bg-white/50 rounded-2xl border border-dashed border-slate-200 mt-4">
                        <p className="text-slate-400 font-medium text-sm">No hay resultados para tu búsqueda.</p>
                    </div>
                )}
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
            />
        </div>
    );
};