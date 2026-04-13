export const LoginForm = ({ onForgot }) => {
    return (
        <form className="space-y-6">
            <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Email o Usuario
                </label>
                <input
                    type="text"
                    placeholder="correo@ejemplo.com o usuario"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Contraseña
                    </label>
                    <button
                        type="button"
                        onClick={onForgot}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-tight"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-100 transition-all duration-200 active:scale-[0.98] text-sm"
            >
                Iniciar Sesión
            </button>
        </form >
    );
};