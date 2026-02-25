import axios from "axios";

const API_BASE_URL = "http://localhost:3000";
export const IMAGE_BASE_URL = `${API_BASE_URL}/Images/`;

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add interceptor for auth if needed later
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
        // config.headers.Authorization = `Bearer ${user.token}`; // Not using tokens yet based on backend
    }
    return config;
});

export default api;
