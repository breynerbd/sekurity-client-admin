import { axiosAuth } from "./api";

// 1. Quita "/auth" de los strings, ya que ya está en la BaseURL
export const login = async (data) => {
    // Esto llamará a: http://localhost:5070/api/v1/auth/login
    return await axiosAuth.post("/login", data);
};

export const register = async (data) => {
    return await axiosAuth.post("/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const forgotPassword = async (email) => {
    return await axiosAuth.post("/forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
    return await axiosAuth.post("/reset-password", { token, newPassword });
};

export const verifyEmail = async (token) => {
    return await axiosAuth.post("/verify-email", { token });
};

// 2. OJO AQUÍ: Si este endpoint no está bajo /api/v1/auth, 
// sino bajo /api/v1/users, asegúrate de cómo lo maneja tu backend.
export const updateUserRole = async (userId, roleName) => {
    return await axiosAuth.put(`/users/${userId}/role`, { roleName });
};

export const getAllUsers = async () => {
    // Si en el backend es api/v1/auth/users, déjalo como "/users"
    const { data } = await axiosAuth.get("/users");
    return { users: data };
};