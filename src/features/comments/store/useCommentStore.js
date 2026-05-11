import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useCommentStore = create((set, get) => ({
    comments: [],
    loading: false,
    error: null,

    // Obtener todos los comentarios
    getComments: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.get("/comments");
            // Adaptamos según la estructura de tu respuesta de API
            set({
                comments: response.data.data || response.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener los comentarios",
                loading: false,
            });
        }
    },

    // Eliminar un comentario (Siguiendo tu patrón de delete)
    deleteComment: async (id) => {
        try {
            set({ loading: true, error: null });
            await axiosAdmin.delete(`/comments/${id}`);

            // Filtramos el comentario eliminado del estado local
            set((state) => ({
                comments: state.comments.filter((c) => (c._id || c.id) !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al eliminar el comentario",
                loading: false,
            });
        }
    },
}));