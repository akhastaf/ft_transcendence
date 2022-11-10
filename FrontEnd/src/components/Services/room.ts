import axios from "axios";
import { localService } from "../../api/axios";

export const getAllRooms = (): Promise<any> => {
	// console.log(localService.defaults.headers.common['Authorization']);
	return localService.get("/channels").then(res => res.data).catch((err) => console.log(err));
};

// export const getRoomData = (roomName: string): Promise<any> => {
// 	return axios.get(`/room/${roomName}`).then(res => res.data);
// }