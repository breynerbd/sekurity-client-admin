import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useUserStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,

    getUsers: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.get("/users");

            let cleanUsersList = [];
            if (response && response.data) {
                if (Array.isArray(response.data)) {
                    cleanUsersList = response.data;
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    cleanUsersList = response.data.data;
                } else if (response.data.users && Array.isArray(response.data.users)) {
                    cleanUsersList = response.data.users;
                }
            }

            set({ users: cleanUsersList, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener los usuarios",
                loading: false,
                users: []
            });
        }
    },

    toggleUserStatus: async (id, currentStatus) => {
        try {
            set({ loading: true, error: null });

            const endpoint = currentStatus ? `/users/${id}/deactivate` : `/users/${id}/activate`;
            const response = await axiosAdmin.patch(endpoint);

            set((state) => ({
                users: state.users.map((u) =>
                    (u._id || u.id) === id
                        ? { ...u, isActive: !currentStatus }
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