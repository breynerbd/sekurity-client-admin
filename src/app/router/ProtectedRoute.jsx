import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    // ✅ CORRECCIÓN: Permitimos el acceso tanto si es "ADMIN" como si es "MASTER_ADMIN"
    const hasAccess = user?.role === "ADMIN" || user?.role === "MASTER_ADMIN";

    if (!isAuthenticated || !hasAccess) {
        return <Navigate to="/" replace />;
    }

    // Si todo está bien, renderiza las rutas hijas
    return <Outlet />;
};