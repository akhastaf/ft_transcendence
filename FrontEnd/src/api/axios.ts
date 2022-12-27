import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { getLocalItem } from "../app/hooks/useLocalStorage";




export const localService = axios.create({
    baseURL: 'http://10.11.6.2:3000/',
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
        // console.log(" i am in the intercept = ", token);
        if (token && config.headers) {
            config.headers["Authorization"] = "Bearer " + token;
        }
    }
    return config;
});

// intercept local service responses
localService.interceptors.response.use((response: AxiosResponse) => {
   
    return response;
}, async function (error) {
   const originalRequest = error.config;
   const errMessage = error.response.data.message as string;
   if (errMessage.includes('Unauthorized') && !originalRequest._retry) {
    originalRequest._retry =true;
    
    await refreshAccesToken();

    return localService(originalRequest);
   }
    return Promise.reject(error);
});

async function refreshAccesToken() {
    localService.get('/auth/refresh_token').then((data) => {
        localStorage.setItem('accessToken', data.data.access_token)
        console.log("yup i am njjj", data);
            // return true;
    }).catch((err) => {

        console.log(err);
        // return false
    })
}
