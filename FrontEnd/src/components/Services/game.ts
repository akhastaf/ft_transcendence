import { localService } from "../../api/axios";


export const getGames = (): Promise<any> => {
	return localService.get("/game").then((res) => {  return res.data}).catch((err) => Promise.reject(err));
};