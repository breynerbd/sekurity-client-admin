import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

import { login as loginRequest } from "../../../shared/api";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,

            checkAuth: () => {
                const token = get().token;
                const role = get().user?.role;
                
                // ✅ PERMITIR ACCESO A ADMIN Y MASTER_ADMIN
                const hasAccess = role === "ADMIN" || role === "MASTER_ADMIN";

                if (token && !hasAccess) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: "No autorizado para acceder al panel de administración"
                    })
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },

            login: async ({ email, password }) => {
                const { data } = await loginRequest({ email, password });

                const token = data.accessToken || data.token;

                const decoded = jwtDecode(token);

                console.log("Token decodificado:", decoded);

                // ✅ Mapeamos el nuevo claim corto "role" que configuramos en .NET.
                // Como fallback temporal, dejamos el claim largo por si usas otros servicios antiguos.
                const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                // ✅ Validamos que pertenezca a cualquiera de los dos roles administrativos permitidos
                if (role !== "ADMIN" && role !== "MASTER_ADMIN") {
                    const message = "No autorizado para acceder al panel de administración";
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: message,
                    });
                    toast.error(message);
                    return { success: false, error: message };
                }

                set({
                    user: {
                        role,
                        username: decoded.username || decoded.unique_name
                    },
                    token,
                    refreshToken: data.refreshToken,
                    expiresAt: data.expiresIn || data.expiresAt,
                    isAuthenticated: true,
                    error: null,
                    isLoadingAuth: false,
                });

                return { success: true };
            },
        }),
        { name: "auth-store" })
);