import { localService } from "../../api/axios";


export const getGames = (): Promise<any> => {
	// console.log(localService.defaults.headers.common['Authorization']);
	return localService.get("/game").then((res) => {  return res.data}).catch((err) => Promise.reject(err));
};