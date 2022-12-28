import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';





export const localService = axios.create({
    baseURL: `${process.env.REACT_APP_ServerHostName}`,
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
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
   
    
   }
    return Promise.reject(error);
});

