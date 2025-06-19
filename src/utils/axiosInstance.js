import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL, // corrected key
    timeout: 5000,     // more reasonable timeout
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // fixed template literal
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors globally 
        if (error.response) {
            if (error.response.status === 401) {
                // Redirect to login page
                window.location.href = "/login"; // fixed typo
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
            } else if (error.code === "ECONNABORTED") { // fixed typo
                console.error("Request timeout. Please try again");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;