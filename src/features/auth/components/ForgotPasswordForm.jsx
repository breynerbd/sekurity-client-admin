export const ForgotPasswordForm = ({ onSwitch }) => {
    return (
        <form className="space-y-6">
            <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-100 transition-all duration-200 active:scale-[0.98] text-sm"
            >
                Enviar correo
            </button>

            <p className="text-center text-sm">
                <span className="text-gray-500">¿Recordaste tu contraseña?</span>{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="text-blue-600 font-bold hover:underline ml-1"
                >
                    Iniciar sesión
                </button>
            </p>
        </form>
    );
};