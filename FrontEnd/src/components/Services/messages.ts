import { localService } from "../../api/axios";

export const getDmMessages = (id : number): Promise<any> => {
	return localService.get("/messages/" + id).then((res) => { return res.data}).catch((err) => Promise.reject(err));
};
export const getRoomMessages = (id : number): Promise<any> => {
	return localService.get("messages/rooms/" + id).then((res) => { return res.data}).catch((err) => Promise.reject(err));
};
