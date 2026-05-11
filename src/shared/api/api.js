import axios from 'axios';
import { useAuthStore } from '../../features/auth/store/authStore.js';

// ================= INSTANCIAS =================

// Instancia Auth (.NET)
const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL || "http://localhost:5070/api/v1/auth",
    timeout: 8000,
    headers: {
        "Content-Type": "application/json",
    }
});

// Instancia Admin (Node.js - Sekurity)
const axiosAdmin = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_URL || "http://localhost:3005/sekurity/v1",
    timeout: 8000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Instancia User (Node.js - Sekurity)
const axiosUser = axios.create({
    baseURL: import.meta.env.VITE_USER_URL || "http://localhost:3006/sekurity/v1",
    timeout: 8000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ================= INTERCEPTORS DE PETICIÓN =================

axiosAuth.interceptors.request.use((config) => {
    config._axiosClient = "auth";
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosAdmin.interceptors.request.use((config) => {
    config._axiosClient = "admin";
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosUser.interceptors.request.use((config) => {
    config._axiosClient = "user";
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ================= LÓGICA DE REFRESH TOKEN =================

let _isRefreshing = false;
let failedQueue = [];

function _processQueue(_error, token = null) {
    failedQueue.forEach(({ resolve, reject }) =>
        _error ? reject(_error) : resolve(token),
    );
    failedQueue = [];
}

const handleRefreshToken = async function (_error) {
    const _original = _error.config;
    if (!_original || _original._retry) {
        return Promise.reject(_error);
    }

    const status = _error.response?.status;
    const errorCode = _error.response?.data?.error;
    const requestUrl = _original.url || "";
    const isRefreshEndpoint = requestUrl.includes("/auth/refresh");

    const shouldRefresh = !isRefreshEndpoint && (
        status === 401 ||
        (status === 403 && errorCode === "TOKEN_EXPIRED")
    );

    if (shouldRefresh) {
        // Seleccionamos el cliente correcto para reintentar según quién falló
        const clients = {
            admin: axiosAdmin,
            user: axiosUser,
            auth: axiosAuth
        };
        const retryClient = clients[_original._axiosClient] || axiosAuth;

        if (_isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    _original.headers["Authorization"] = "Bearer " + token;
                    return retryClient(_original);
                })
                .catch((err) => Promise.reject(err));
        }

        _original._retry = true;
        _isRefreshing = true;

        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
            useAuthStore.getState().logout();
            return Promise.reject(_error);
        }

        try {
            // El refresh siempre se pide al servicio de Auth
            const response = await axiosAuth.post("/refresh", { refreshToken });

            const {
                accessToken,
                refreshToken: newRefreshToken,
                expiresIn,
                userDetails,
            } = response.data;

            useAuthStore.setState({
                token: accessToken,
                refreshToken: newRefreshToken,
                expiresAt: expiresIn,
                user: userDetails || useAuthStore.getState().user,
                isAuthenticated: true,
            });

            _processQueue(null, accessToken);
            _original.headers["Authorization"] = "Bearer " + accessToken;
            return retryClient(_original);

        } catch (err) {
            _processQueue(err, null);
            useAuthStore.getState().logout();
            return Promise.reject(err);
        } finally {
            _isRefreshing = false;
        }
    }
    return Promise.reject(_error);
};

// ================= INTERCEPTORS DE RESPUESTA =================

axiosAuth.interceptors.response.use((res) => res, handleRefreshToken);
axiosAdmin.interceptors.response.use((res) => res, handleRefreshToken);
axiosUser.interceptors.response.use((res) => res, handleRefreshToken);

export { axiosAuth, axiosAdmin, axiosUser, handleRefreshToken };