import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore.js";
import imgLogo from "../../../assets/img/sekurity_logo.png";

export const AvatarUser = () => {
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setOpen(false);
        logout();
        navigate("/", { replace: true });
    };

    // Estilo Sekurity: AU o foto de perfil
    const avatarSrc = user?.profilePicture && user.profilePicture.trim() !== ""
        ? user.profilePicture : null;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Contenedor del Avatar Estilo Sekurity */}
            <button
                onClick={toggleMenu}
                className="relative group focus:outline-none active:scale-95 transition-transform"
            >
                <div className={`w-11 h-11 rounded-2xl p-[2px] shadow-md transition-all ${open ? 'ring-2 ring-blue-500 ring-offset-2' : 'bg-gradient-to-br from-blue-400 to-blue-700'}`}>
                    <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden">
                        {avatarSrc ? (
                            <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-blue-700 font-black text-lg uppercase">
                                {user?.username?.substring(0, 2) || "AU"}
                            </span>
                        )}
                    </div>
                </div>
                {/* Punto de estado online */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </button>

            {/* Dropdown Menu Estilo Sekurity */}
            {open && (
                <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-blue-900/10 animate-in fade-in zoom-in duration-200 z-[70] overflow-hidden">

                    {/* Header: Información del Usuario */}
                    <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.15em] mb-1">
                            Sesión Activa
                        </p>
                        <p className="font-black text-gray-900 text-sm truncate">
                            {user?.username || "Admin User"}
                        </p>
                        <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">
                            {user?.email || "admin@sekurity.com"}
                        </p>
                    </div>

                    {/* Acciones */}
                    <div className="p-2">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors group"
                        >
                            <div className="p-2 rounded-lg bg-red-100/50 group-hover:bg-red-100 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                            </div>
                            Cerrar Sesión
                        </button>
                    </div>

                    {/* Footer decorativo */}
                    <div className="px-5 py-2 bg-blue-600">
                        <p className="text-[8px] text-center font-bold text-white uppercase tracking-widest opacity-80">
                            Sekurity Management v1.0
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};