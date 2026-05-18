import { axiosAuth } from "./api";

export const login = async (data) => {
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

export const updateUserRole = async (userId, roleName) => {
    return await axiosAuth.put(`/users/${userId}/role`, { roleName });
};

export const getAllUsers = async () => {
    const { data } = await axiosAuth.get("/users");
    return { users: data };
};