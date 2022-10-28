import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocalItem } from "../app/hooks/useLocalStorage";




export const localService = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        crossdomain: true,
    },
    withCredentials : true
});


// axios.defaults.baseURL = `localhost:3000/`;

// axios.interceptors.request.use(
// 	(config: any) => {
// 		if (!config.headers.Authorization) {
// 			const token = getLocalItem("access");
//             console.log(token);

// 			if (token) {
// 				config.headers.Authorization = `Bearer ${token}`;
// 			}
// 		}

// 		return config;
// 	},
// 	(error: any) => Promise.reject(error)
// );



localService.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config) {
        console.log("hello i am inside the intecptor");
        const token = localStorage.getItem("accessToken");
        console.log(token);
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

