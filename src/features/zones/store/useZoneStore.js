import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useZoneStore = create((set, get) => ({
    zones: [],
    loading: false,
    error: null,

    getZones: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.get("/zones");
            set({
                zones: response.data.data || response.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener las zonas",
                loading: false,
            });
        }
    },

    createZone: async (zoneData) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.post("/zones", zoneData);
            const newZone = response.data.data || response.data;

            set((state) => ({
                zones: [...state.zones, newZone],
                loading: false,
            }));
            return newZone;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al crear la zona",
                loading: false,
            });
            throw error;
        }
    },

    deleteZone: async (id) => {
        try {
            set({ loading: true, error: null });
            await axiosAdmin.delete(`/zones/${id}`);
            set((state) => ({
                zones: state.zones.filter((z) => (z.id || z._id) !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al eliminar la zona",
                loading: false,
            });
            throw error;
        }
    }
}));