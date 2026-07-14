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
        { label: "Activos", count: users.filter(u => u.isActive === true).length, icon: "👥", color: "text-green-600", bg: "bg-green-50" },
        { label: "Inactivos", count: users.filter(u => u.isActive === false).length, icon: "👤", color: "text-gray-400", bg: "bg-gray-100" },
        { label: "Moderadores", count: users.filter(u => u.role === 'Moderador').length, icon: "🛡️", color: "text-blue-600", bg: "bg-blue-50" },
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

            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Control de Usuarios
                </h2>
                <div className="h-1.5 w-16 bg-blue-600 mt-2 rounded-full"></div>
                <p className="text-gray-500 mt-3 font-medium text-sm md:text-base">
                    Gestiona privilegios, roles y estados de las cuentas registradas.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center text-xl`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 mb-8">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o correo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    />
                </div>
            </div>

            <div className="bg-white md:bg-transparent rounded-2xl overflow-hidden">
                {/* TABLA ESCRITORIO */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100">
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Rol</th>
                                <th className="px-6 py-4 text-center">Actividad</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {!loading && filteredUsers.map((user) => (
                                <tr key={user._id || user.id} className="hover:bg-blue-50/20 transition group cursor-pointer" onClick={() => handleViewUser(user)}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black">
                                                {user.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                                <p className="text-[11px] text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${user.role === 'Moderador' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-4 text-xs font-bold text-gray-600">
                                            <div className="flex flex-col items-center">
                                                <span className="text-blue-600">{user.reportsCount || 0}</span>
                                                <span className="text-[9px] text-gray-400 uppercase">Rep</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-blue-600">{user.commentsCount || 0}</span>
                                                <span className="text-[9px] text-gray-400 uppercase">Com</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2 w-fit ${user.isActive === true ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.isActive === true ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                                            {user.isActive === true ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => onToggleStatus(e, user)}
                                            className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${user.isActive === true ? 'border-gray-200 text-gray-400 hover:text-red-600' : 'border-green-200 text-green-600'}`}
                                        >
                                            {user.isActive === true ? 'Desactivar' : 'Activar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* VISTA MÓVIL: CARDS */}
                <div className="md:hidden space-y-4">
                    {!loading && filteredUsers.map((user) => (
                        <div
                            key={user._id || user.id}
                            onClick={() => handleViewUser(user)}
                            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg font-black">
                                    {user.name?.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{user.name}</h4>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${user.role === 'Moderador' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex gap-4">
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-blue-600">{user.reportsCount || 0}</p>
                                        <p className="text-[9px] text-gray-400 uppercase font-bold">Reports</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-blue-600">{user.commentsCount || 0}</p>
                                        <p className="text-[9px] text-gray-400 uppercase font-bold">Comments</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => onToggleStatus(e, user)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${user.isActive === true ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}
                                >
                                    {user.isActive === true ? 'Desactivar' : 'Activar'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ESTADO DE CARGA Y VACÍO */}
                {loading && (
                    <div className="p-20 text-center text-gray-400 font-medium italic">Sincronizando base de datos...</div>
                )}
                {!loading && filteredUsers.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium">No hay resultados para tu búsqueda.</div>
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