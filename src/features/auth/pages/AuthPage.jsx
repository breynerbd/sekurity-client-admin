import { useState } from "react";
import { LoginForm } from "../components/LoginForm.jsx";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm.jsx";
import imgLogo from "../../../assets/img/sekurity_logo.png";

export const AuthPage = () => {
    const [isForgot, setIsForgot] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 font-sans">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

                {/* Logo y Encabezado */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <img
                        src={imgLogo}
                        alt="Sekurity Logo"
                        className="h-32 w-auto mb-2"
                    />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        Admin Panel
                    </span>
                </div>

                {/* Títulos Dinámicos */}
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {isForgot ? "Recuperar Contraseña" : "Bienvenido de Nuevo"}
                    </h1>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                        {isForgot
                            ? "Ingresa tu correo para recuperar tu contraseña"
                            : "Ingresa a tu cuenta de administrador de Sekurity"}
                    </p>
                </div>

                {/* Alternancia de Formularios */}
                {isForgot ? (
                    <ForgotPasswordForm
                        onSwitch={() => setIsForgot(false)}
                    />
                ) : (
                    <LoginForm onForgot={() => setIsForgot(true)} />
                )}
            </div>
        </div>
    );
};