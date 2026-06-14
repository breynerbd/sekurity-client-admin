import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useUserStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,

    // Obtener todos los usuarios
    getUsers: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.get("/users");
            
            // 🔍 Analizamos inteligentemente la estructura que manda tu backend
            let cleanUsersList = [];

            if (response && response.data) {
                if (Array.isArray(response.data)) {
                    cleanUsersList = response.data;
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    cleanUsersList = response.data.data;
                } else if (response.data.users && Array.isArray(response.data.users)) {
                    cleanUsersList = response.data.users; // ✅ Por si tu backend de Node usa la propiedad "users"
                }
            }

            set({
                users: cleanUsersList,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener los usuarios",
                loading: false,
                users: [] // Fallback seguro para evitar que .filter() rompa el componente visual
            });
        }
    },

    // Alternar estado (Activar/Desactivar)
    toggleUserStatus: async (id) => {
        try {
            set({ loading: true, error: null });
            // Asumimos que tienes un endpoint tipo PATCH o PUT para esto
            const response = await axiosAdmin.patch(`/users/toggle-status/${id}`);

            // Actualizamos el estado localmente
            set((state) => ({
                users: state.users.map((u) =>
                    (u._id || u.id) === id
                        ? { ...u, status: u.status === 'Activo' ? 'Inactivo' : 'Activo' }
                        : u
                ),
                loading: false,
            }));
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al cambiar el estado del usuario",
                loading: false,
            });
            throw error;
        }
    }
}));