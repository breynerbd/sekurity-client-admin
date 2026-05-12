import { toast } from "react-hot-toast";
import { React } from "react";

export function showConfirmToast({ title, message, onConfirm }) {
    toast.custom((t) => (
        <div className={`${t.visible ? 'animate-fadeIn' : 'opacity-0'} bg-white p-8 rounded-[24px] w-[400px] text-center shadow-2xl border border-gray-100 transition-all duration-200`}>

            {/* ICONO DE ADVERTENCIA EN AZUL SEKURITY */}
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{title}</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed px-4">{message}</p>

            <div className="flex flex-col gap-3 items-center">
                {/* BOTÓN CONFIRMAR CON TU ESTILO EXACTO */}
                <button
                    onClick={() => {
                        onConfirm?.();
                        toast.dismiss(t.id);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Confirmar Acción
                </button>

                {/* BOTÓN CANCELAR - ESTILO TEXTO PLANO */}
                <button
                    className="w-full py-2 text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-gray-600 transition-colors"
                    onClick={() => toast.dismiss(t.id)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    ), {
        duration: 5000,
        position: 'top-center',
    });
}