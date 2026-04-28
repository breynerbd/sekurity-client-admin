import { useState } from "react";
import { UserModal } from "./UserModal.jsx";

export const Users = ({ users = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full font-sans">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
                <p className="text-gray-500 text-sm">Administra y supervisa los usuarios del sistema</p>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: "Usuarios Activos", count: "4", icon: "👥", color: "text-green-600", bg: "bg-green-50" },
                    { label: "Usuarios Inactivos", count: "2", icon: "👤", color: "text-gray-600", bg: "bg-gray-100" },
                    { label: "Moderadores", count: "1", icon: "🛡️", color: "text-blue-600", bg: "bg-blue-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center text-xl`}>{stat.icon}</div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* FILTER BAR */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
                    <input type="text" placeholder="Buscar usuarios..." className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500" />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600">
                    <option>Todos los estados</option>
                </select>
            </div>

            {/* USERS TABLE */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                            <th className="px-6 py-4">Usuario</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Rol</th>
                            <th className="px-6 py-4 text-center">Reportes</th>
                            <th className="px-6 py-4 text-center">Comentarios</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold uppercase">{user.name?.charAt(0)}</div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                                <p className="text-[10px] text-gray-400">{user.joinDate}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">✉ {user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${user.role === 'Moderador' ? 'bg-purple-50 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-gray-700">{user.reportsCount}</td>
                                    <td className="px-6 py-4 text-center font-bold text-gray-700">{user.commentsCount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${user.status === 'Activo' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                            <span className={`w-1 h-1 rounded-full ${user.status === 'Activo' ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleViewUser(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">👁️</button>
                                            <button className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition ${user.status === 'Activo' ? 'border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500' : 'border-green-200 text-green-600 hover:bg-green-50'}`}>
                                                {user.status === 'Activo' ? 'Desactivar' : 'Activar'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7" className="p-10 text-center text-gray-400 italic">No hay usuarios registrados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={selectedUser} />
        </div>
    );
};