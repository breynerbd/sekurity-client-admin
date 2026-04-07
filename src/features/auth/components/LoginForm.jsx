export const LoginForm = ({ onForgot }) => {
    return (
        <form className="space-y-6">
            <div>
                <label className="block text-xs font-semibold text-gray-500 tracking-wider mb-2">
                    Email o Usuario
                </label>
                <input
                    type="text"
                    placeholder="admin@sekurity.com"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                />
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <label className="block text-xs font-semibold text-gray-500 tracking-wider">
                        Contraseña
                    </label>
                    <button
                        type="button"
                        onClick={onForgot}
                        className="text-xs text-blue-600 hover:text-gray-700 transition-colors cursor-pointer font-medium"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-blue-100 transition-all duration-200 text-sm active:scale-[0.98] cursor-pointer"
            >
                Iniciar Sesión
            </button>
        </form>
    );
};