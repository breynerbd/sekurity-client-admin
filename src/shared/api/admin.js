import { axiosAdmin } from "./api";

// ================= USERS (Gestión de Usuarios) =================
export const getAllUsers = () => axiosAdmin.get("/users");
export const getUserById = (id) => axiosAdmin.get(`/users/${id}`);
export const deactivateUser = (id) => axiosAdmin.patch(`/users/${id}/deactivate`);

// ================= REPORTS (Gestión de Incidentes/Reportes) =================
export const getAllReports = () => axiosAdmin.get("/reports");
export const getReportById = (id) => axiosAdmin.get(`/reports/${id}`);
export const updateReportStatus = (id, status) => axiosAdmin.patch(`/reports/${id}/status`, { status });
export const deleteReport = (id) => axiosAdmin.delete(`/reports/${id}`);

// ================= ZONES (Gestión de Sectores/Zonas) =================
export const getAllZones = () => axiosAdmin.get("/zones");
export const createZone = (data) => axiosAdmin.post("/zones", data);
export const updateZone = (id, data) => axiosAdmin.put(`/zones/${id}`, data);
export const deleteZone = (id) => axiosAdmin.delete(`/zones/${id}`);

// ================= COMMENTS (Moderación de Comentarios) =================
export const getAllComments = () => axiosAdmin.get("/comments");
export const deleteComment = (id) => axiosAdmin.delete(`/comments/${id}`);

// ================= RATINGS (Estadísticas y Calificaciones) =================
export const getAllRatings = () => axiosAdmin.get("/ratings");
export const getAverageRatings = () => axiosAdmin.get("/ratings/averageByReport");

// ================= INTERNALS (Sincronización) =================
// Este endpoint suele usarse entre microservicios, pero lo dejo por si lo necesitas
export const syncUserFromAuth = (userData) => axiosAdmin.post("/internals/sync-user", userData);