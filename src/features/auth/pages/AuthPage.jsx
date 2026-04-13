import { useState } from "react";
import { LoginForm } from "../components/LoginForm.jsx";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm.jsx";
import imgLogo from "../../../assets/img/sekurity_logo.png"

export const AuthPage = () => {
    // 1. Estado para alternar entre Login y Recuperar Contraseña
    const [isForgot, setIsForgot] = useState(false);

    return (
        /* 1. Contenedor principal: Fondo gris claro suave como el dashboard */
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 font-sans">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

                {/* 3. Contenedor de logo */}
                <div className="flex flex-col items-center justify-center mb-8">
                    {/* 4. Icono/Logo Sekurity con el azul de la imagen */}
                    <img
                        src={imgLogo}
                        alt="Sekurity Logo"
                        className="h-34 w-auto"
                    />
                    <div className="flex flex-col leading-tight">
                        <br />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Admin Panel
                        </span>
                    </div>
                </div>

                {/* 5. Bloque de título y subtítulo */}
                <div className="text-center mb-10">
                    {/* 6. Título Principal dinámico */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {isForgot ? "Recuperar Contraseña" : "Bienvenido de Nuevo"}
                    </h1>

                    {/* 7. Subtítulo / descripción dinámica */}
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                        {isForgot
                            ? "Ingresa tu correo para recuperar tu contraseña"
                            : "Ingresa a tu cuenta de administrador de Sekurity"}
                    </p>
                </div>

                {/* SECCIÓN DEL FORMULARIO DINÁMICO */}
                {isForgot ? (
                    <ForgotPasswordForm
                        onSwitch={() => {
                            setIsForgot(false);
                        }}
                    />
                ) : (
                    <LoginForm onForgot={() => setIsForgot(true)} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;