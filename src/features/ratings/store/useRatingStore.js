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

        const totalVotes = ratings.reduce((acc, curr) => acc + Number(curr.totalRatings || 0), 0);

        const validAverages = ratings.map(r => Number(r.average)).filter(avg => !isNaN(avg));
        const avgGlobal = validAverages.length > 0
            ? (validAverages.reduce((acc, curr) => acc + curr, 0) / validAverages.length).toFixed(1)
            : "0.0";

        const bestItem = [...ratings].sort((a, b) => Number(b.average || 0) - Number(a.average || 0))[0];
        const bestReport = bestItem?.report?.title || bestItem?.title || "N/A";

        return { avg: avgGlobal, total: totalVotes, best: bestReport };
    }
}));