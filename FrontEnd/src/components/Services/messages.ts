import { localService } from "../../api/axios";

export const getDmMessages = (id : number): Promise<any> => {
	// console.log(localService.defaults.headers.common['Authorization']);
	return localService.get("/messages/" + id).then((res) => { return res.data}).catch((err) => console.log(err));
};
export const getRoomMessages = (id : number): Promise<any> => {
	// console.log(localService.defaults.headers.common['Authorization']);
	return localService.get("messages/rooms/" + id).then((res) => { return res.data}).catch((err) => console.log(err));
};
