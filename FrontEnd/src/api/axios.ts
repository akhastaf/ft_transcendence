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
}, async function (error) {
   const originalRequest = error.config;
   const errMessage = error.response.data.message as string;
   if (errMessage.includes('Unauthorized') && !originalRequest._retry) {
    originalRequest._retry =true;
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    window.location.assign(`${process.env.REACT_APP_ClientHostName}/`);
    
    
}
if (error.response.data.statusCode === 403)
{
       //window.location.assign(`${process.env.REACT_APP_ClientHostName}/Forbidden`);

   }
    return Promise.reject(error);
});

