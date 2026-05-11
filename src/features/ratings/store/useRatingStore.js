import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useRatingStore = create((set, get) => ({
    ratings: [],
    loading: false,
    error: null,

    getRatings: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.get("/ratings");
            set({
                ratings: response.data.data || response.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener las calificaciones",
                loading: false,
            });
        }
    },

    getStats: () => {
        const { ratings } = get();
        if (ratings.length === 0) return { avg: 0, total: 0, best: "N/A" };

        const totalVotes = ratings.reduce((acc, curr) => acc + curr.totalRatings, 0);
        const avgGlobal = (ratings.reduce((acc, curr) => acc + curr.average, 0) / ratings.length).toFixed(1);
        const bestReport = [...ratings].sort((a, b) => b.average - a.average)[0]?.title;

        return { avg: avgGlobal, total: totalVotes, best: bestReport };
    }
}));