import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';




export const localService = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        crossdomain: true,
    },
});


localService.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config) {
        const token = localStorage.getItem("accessToken");
        if (token && config.headers) {
            config.headers["Authorization"] = "Bearer " + token;
        }
    }
    return config;
});

// intercept local service responses
localService.interceptors.response.use((response: AxiosResponse) => {
    return response;
});

