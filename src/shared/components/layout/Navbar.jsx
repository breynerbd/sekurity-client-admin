import imgLogo from "../../../assets/img/sekurity_logo.png";
import { AvatarUser } from "../ui/AvatarUser";

export const Navbar = () => {
    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[60] border-b border-gray-100 shadow-sm">
            {/* Altura: h-14 en móvil (más bajo que antes) y h-20 en PC */}
            <div className="w-full mx-auto px-3 lg:px-6 h-14 lg:h-20 flex items-center justify-between">

                {/* SECCIÓN IZQUIERDA: Logo y Títulos */}
                <div className="flex items-center gap-2 lg:gap-4 group cursor-pointer">
                    {/* Contenedor del logo más pequeño en móvil */}
                    <div className="bg-blue-50/50 p-1 lg:p-2 rounded-lg lg:rounded-xl border border-blue-100/50 transition-transform group-hover:scale-105">
                        <img
                            src={imgLogo}
                            alt="Sekurity Logo"
                            className="h-6 lg:h-10 w-auto object-contain" // h-6 en móvil es muy sutil
                        />
                    </div>

                    <div className="flex flex-col">
                        {/* Título: text-sm en móvil, text-xl en PC */}
                        <h1 className="font-black text-gray-900 text-sm lg:text-xl tracking-tighter leading-none">
                            SEKURITY
                        </h1>
                        {/* Subtítulo: text-[7px] en móvil, text-[10px] en PC */}
                        <span className="text-[7px] lg:text-[10px] font-bold text-blue-600 uppercase tracking-[0.15em] lg:tracking-[0.2em] mt-0.5 lg:mt-1">
                            Security Management
                        </span>
                    </div>
                </div>

                {/* SECCIÓN DERECHA: Acciones y Perfil */}
                <div className="flex items-center gap-1 lg:gap-6">
                    {/* Botón notificaciones más discreto */}
                    <button className="relative p-1.5 lg:p-2 text-gray-400 hover:text-blue-600 transition-all">
                        <svg className="w-4 h-4 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </button>

                    <div className="h-6 lg:h-8 w-[1px] bg-gray-100 hidden sm:block"></div>

                    <div className="flex items-center gap-2 lg:gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-black text-gray-900 leading-none">Admin User</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Super Administrator</p>
                        </div>

                        {/* Escalar el Avatar un poco hacia abajo en móvil */}
                        <div className="scale-90 lg:scale-100">
                            <AvatarUser />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};