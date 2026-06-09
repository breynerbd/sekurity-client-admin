import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
    const location = useLocation();

    const items = [
        { id: "dashboard", label: "Dashboard", icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
        { id: "reports", label: "Reportes", icon: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
        { id: "comments", label: "Comentarios", icon: <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> },
        { id: "users", label: "Usuarios", icon: <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
        { id: "zones", label: "Zonas", icon: <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> },
        { id: "ratings", label: "Ratings", icon: <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /> },
    ];

    return (
        <>
            {/* --- SIDEBAR ESCRITORIO (Recupera su tamaño normal) --- */}
            <aside className="hidden lg:flex w-72 bg-white min-h-[calc(100vh-5rem)] p-6 border-r border-gray-100 flex-col fixed top-20 left=0 overflow-y-auto">
                <nav>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">
                        Menú de Gestión
                    </p>
                    <ul className="space-y-2">
                        {items.map((item) => {
                            const routePath = item.id === "dashboard" ? "/dashboard" : `/dashboard/${item.id}`;
                            const isActive = location.pathname === routePath;
                            return (
                                <li key={item.id}>
                                    <Link
                                        to={routePath}
                                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all border ${isActive
                                            ? "bg-blue-50 text-blue-700 border-blue-100 shadow-sm"
                                            : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.8}
                                            stroke="currentColor"
                                            className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`}
                                        >
                                            {item.icon}
                                        </svg>
                                        <span className="text-sm tracking-tight">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="mt-auto pt-6">
                    <div className="bg-blue-600 rounded-2xl p-5 text-center shadow-lg shadow-blue-900/20">
                        <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-1">Sekurity Pro</p>
                        <p className="text-[9px] text-white/80 leading-relaxed">Sistema de vigilancia v2.0</p>
                    </div>
                </div>
            </aside>

            {/* --- TAB BAR MÓVIL (Se mantiene pequeña para ahorrar espacio) --- */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-1 py-1 pb-3 z-50 flex justify-around items-center h-16 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                {items.map((item) => {
                    const routePath = item.id === "dashboard" ? "/dashboard" : `/dashboard/${item.id}`;
                    const isActive = location.pathname === routePath;

                    return (
                        <Link
                            key={item.id}
                            to={routePath}
                            className="flex flex-col items-center justify-center flex-1 min-w-0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={isActive ? 2 : 1.5}
                                stroke="currentColor"
                                className={`w-5 h-5 transition-all ${isActive ? "text-blue-600 scale-110" : "text-gray-400"}`}
                            >
                                {item.icon}
                            </svg>
                            <span className={`text-[9px] font-bold tracking-tighter truncate w-full text-center mt-1 ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
};