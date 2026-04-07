export const RegisterForm = () => {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 tracking-wider mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                    />
                </div>
                {/* Apellido */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 tracking-wider mb-2">
                        Apellido
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                    />
                </div>
            </div>

            {/* Correo Electrónico */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 tracking-wider mb-2">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    placeholder="admin@sekurity.com"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                />
            </div>

            {/* Teléfono */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 tracking-wider mb-2">
                    Teléfono
                </label>
                <input
                    type="tel"
                    placeholder="+502 0000-0000"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                />
            </div>

            {/* Contraseñas */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 tracking-wider mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 tracking-wider mb-2">
                        Confirmar
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-blue-100 transition-all duration-200 text-sm active:scale-[0.98] cursor-pointer mt-4"
            >
                Crear Cuenta
            </button>
        </form>
    );
};