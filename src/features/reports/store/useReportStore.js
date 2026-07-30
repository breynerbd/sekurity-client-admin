import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useReportStore = create((set, get) => ({
    reports: [],
    loading: false,
    error: null,

    getReports: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.get("/reports");
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
            throw error;
        }
    },

    updateReport: async (id, updateData) => {
        try {
            set({ loading: true, error: null });
            const payload = {
                status: updateData.status,
                newStatus: updateData.status
            };
            const response = await axiosAdmin.patch(`/reports/${id}/status`, payload);

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