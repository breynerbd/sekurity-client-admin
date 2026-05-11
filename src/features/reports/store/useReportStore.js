import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useReportStore = create((set, get) => ({
    reports: [],
    loading: false,
    error: null,

    // Obtener todos los reportes
    getReports: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.get("/reports");
            // Adaptamos según tu estructura (data.data o data)
            set({
                reports: response.data.data || response.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener los reportes",
                loading: false,
            });
        }
    },

    // Eliminar un reporte
    deleteReport: async (id) => {
        try {
            set({ loading: true, error: null });
            await axiosAdmin.delete(`/reports/${id}`);

            set((state) => ({
                reports: state.reports.filter((r) => (r._id || r.id) !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al eliminar el reporte",
                loading: false,
            });
            throw error; // Re-lanzamos para manejarlo en el componente
        }
    },

    // Actualizar estado o prioridad de un reporte
    updateReport: async (id, updateData) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.put(`/reports/${id}`, updateData);

            set((state) => ({
                reports: state.reports.map((r) =>
                    (r._id || r.id) === id ? { ...r, ...updateData } : r
                ),
                loading: false,
            }));
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al actualizar el reporte",
                loading: false,
            });
            throw error;
        }
    }
}));