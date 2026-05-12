import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useCommentStore = create((set) => ({
    comments: [],
    loading: false,
    error: null,

    getComments: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.get("/comments");
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

    deleteComment: async (id) => {
        try {
            // No ponemos loading: true aquí para que la lista no parpadee al eliminar
            await axiosAdmin.delete(`/comments/${id}`);

            set((state) => ({
                comments: state.comments.filter((c) => (c._id || c.id) !== id),
            }));
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || "Error al eliminar el comentario";
            set({ error: msg });
            throw new Error(msg);
        }
    },
}));