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
            set({
                users: response.data.data || response.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener los usuarios",
                loading: false,
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