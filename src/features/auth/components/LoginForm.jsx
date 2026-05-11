import { useAuthStore } from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

export const LoginForm = ({ onForgot }) => {
    const navigate = useNavigate();

    // Hooks de autenticación
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    // Configuración de react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await login(data);
        if (res) {
            navigate("/dashboard");
            toast.success("Bienvenido de nuevo 🚀");
        } else {
            // Si el store no maneja el mensaje, puedes usar un fallback
            toast.error(error || "Credenciales incorrectas");
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Email o Usuario
                </label>
                <input
                    type="text"
                    placeholder="correo@ejemplo.com o usuario"
                    {...register("email", { required: "El usuario es obligatorio" })}
                    className={`w-full px-4 py-3 text-sm bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-300`}
                />
                {errors.email && <span className="text-[10px] text-red-500 mt-1">{errors.email.message}</span>}
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
                    {...register("password", {
                        required: "La contraseña es obligatoria",
                        minLength: { value: 8, message: "Mínimo 8 caracteres" }
                    })}
                    className={`w-full px-4 py-3 text-sm bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-300`}
                />
                {errors.password && <span className="text-[10px] text-red-500 mt-1">{errors.password.message}</span>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-100 transition-all duration-200 active:scale-[0.98] text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
        </form>
    );
};