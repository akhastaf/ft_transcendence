import { localService } from "../../api/axios";

export const getAllRooms = (): Promise<any> => {
	return localService.get("/channels").then((res) => {  return res.data}).catch((err) => Promise.reject(err));
};


export const getRoomUsers = (id: string) : Promise<any> => {
	return localService.get("/channels/members/" + id).then((res) => res.data  ).catch(err => Promise.reject(err));	
}
// export const getRoomData = (roomName: string): Promise<any> => {
// 	return axios.get(`/room/${roomName}`).then(res => res.data);
// }

export const joinRoom = () : Promise<any> => {
	return localService.post("")
}

export const AllRooms = (): Promise<any> =>{
	return localService.get("channels/guild-discovery").then(res => res.data).catch(err => Promise.reject(err));
}

// export const getRoomId = (id : number): Promise<any> =>{
// 	return localService.get("channels/"+id).then((res) => res.data).catch(err => {});
// }

export const Dms = (): Promise<any> => {
	return localService.get("/messages/").then(res => res.data).catch(err => Promise.reject(err));
}

export const getPrivacy = (id : number): Promise<any> => {
	return localService.get("channels/privacy/" + id).then((res) => res.data).catch(err => Promise.reject(err));
}