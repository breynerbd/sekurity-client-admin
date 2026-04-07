import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm.jsx";

const AuthPage = () => {
    const [isForgot, setIsForgot] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">

                {/* Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="/src/assets/img/sekurity_logo.png"
                        alt="Sekurity Logo"
                        className="h-24 w-auto object-contain mb-6"
                    />
                    <p className="text-sm text-gray-400 font-medium tracking-widest uppercase">Admin Panel</p>
                </div>

                {/* Header Dinámico */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {isForgot ? "Recuperar acceso" : "Bienvenido"}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {isForgot ? "Ingresa tu email para recibir instrucciones" : "Accede al panel de control del sistema"}
                    </p>
                </div>

                {isForgot ? (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-500 tracking-wider mb-2">
                                Email de recuperación
                            </label>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                            />
                        </div>
                        <button className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all text-sm cursor-pointer">
                            Enviar enlace
                        </button>
                        <button
                            onClick={() => setIsForgot(false)}
                            className="w-full text-sm text-gray-500 font-medium hover:text-gray-700 transition-colors cursor-pointer"
                        >
                            Volver al inicio
                        </button>
                    </div>
                ) : (
                    <>
                        <LoginForm onForgot={() => setIsForgot(true)} />
                        <div className="mt-8 text-center pt-6 border-t border-gray-50">
                            <Link
                                to="/register"
                                className="text-sm text-blue-600 hover:text-gray-800 transition-colors font-semibold"
                            >
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPage;