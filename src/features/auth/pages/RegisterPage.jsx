import { Link } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm.jsx";

const RegisterPage = () => {
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

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Nueva cuenta</h1>
                    <p className="text-gray-500 text-sm">Crea tu perfil de administrador de Sekurity</p>
                </div>

                <RegisterForm />

                <div className="mt-8 text-center pt-6 border-t border-gray-50">
                    <Link
                        to="/login"
                        className="text-sm text-blue-600 hover:text-gray-800 transition-colors font-semibold"
                    >
                        ¿Ya tienes cuenta? Inicia sesión
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;