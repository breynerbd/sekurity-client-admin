
import toast from "react-hot-toast";

const baseStyle = {
    borderRadius: "12px", // Un poco más redondeado para el look moderno de Sekurity
    fontWeight: "600",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    padding: "16px 24px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
};

export const showSuccess = (message) =>
    toast.success(message, {
        style: {
            ...baseStyle,
            // Gradiente azul/esmeralda para éxito tecnológico
            background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
            color: "#34d399",
            border: "1px solid #10b981",
        },
        iconTheme: {
            primary: "#10b981",
            secondary: "#0f172a",
        },
    });

export const showError = (message) =>
    toast.error(message, {
        style: {
            ...baseStyle,
            // Fondo oscuro con borde rojo intenso para alertas de seguridad
            background: "linear-gradient(90deg, #450a0a 0%, #7f1d1d 100%)",
            color: "#fecaca",
            border: "1px solid #ef4444",
        },
        iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
        },
    });

export const showInfo = (message) =>
    toast(message, {
        icon: 'ℹ️',
        style: {
            ...baseStyle,
            // Azul corporativo de Sekurity
            background: "linear-gradient(90deg, #1e40af 0%, #1e3a8a 100%)",
            color: "#dbeafe",
            border: "1px solid #3b82f6",
        },
    });

export const showWarning = (message) =>
    toast(message, {
        icon: '⚠️',
        style: {
            ...baseStyle,
            background: "linear-gradient(90deg, #78350f 0%, #92400e 100%)",
            color: "#fef3c7",
            border: "1px solid #f59e0b",
        },
    });