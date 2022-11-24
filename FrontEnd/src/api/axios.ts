import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { getLocalItem } from "../app/hooks/useLocalStorage";




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
        // console.log("hello i am inside the intecptor");
        const token = localStorage.getItem("accessToken");
        console.log(" i am in the intercept = ", token);
        if (token && config.headers) {
            config.headers["Authorization"] = "Bearer " + token;
        }
    }
    return config;
});

// intercept local service responses
localService.interceptors.response.use((response: AxiosResponse) => {
    // if (response.data.status === 400)
    // {
    //     console.log('====================================');
    //     console.log("here we are in 400");
    //     console.log('====================================');
    // }
    // console.log('====================================');
    console.log(response.status);
    // console.log('====================================');
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log("here i am error 400");
    return Promise.reject(error);
});

