import { localService } from "../../api/axios";
import { Status } from "../Types/types";

export const getCurrentUser = (): Promise<any> => {
	// return localService.get("/user/"+id).then(res => res.data).catch(err => console.log(err));
	return localService.get("user/me").then(res=> res.data).catch(err => console.log(err));
};
export const getAUser = (id: number): Promise<any> => {
	return localService.get("/user/"+id).then(res => res.data).catch(err => console.log(err));
};

export const getBlockedList = () : Promise<any> => {
	return localService.get("channels/blocked-users").then((res) => res.data).catch(err => console.log(err));
};

export const getMyRole = (id: number) : Promise<any> => {
	return localService.get("channels/role/" +id).then((res) => res.data).catch(err => console.log(err));
}
export const AddFriend = (id: number) : Promise<any> => {
	return localService.get("user/add/" +id).then((res) => res.data).catch(err => console.log(err));
}
export const BlockFriend = (id: number) : Promise<any> => {
	return localService.get("user/add/" +id).then((res) => res.data).catch(err => console.log(err));
}
export const GetFriends = () : Promise<any> => {
	return localService.get("channels/friend-users").then((res) => {console.log("friends", res); return res.data}).catch(err => console.log(err));
}
export const GetBlockedFriends = () : Promise<any> => {
	return localService.get("user/blocked/" ).then((res) => res.data).catch(err => console.log(err));
}
export const setADmin = (data : FormData) : Promise<any> => {
	return localService.post("channels/set-admin/" , data).then((res) => res.data).catch(err => console.log(err));
}
export const unsetADmin = (data : FormData) : Promise<any> => {
	return localService.post("channels/unset-admin/", data ).then((res) => res.data).catch(err => console.log(err));
}
export const ChangePrivacy = (id : number , id_group : number) : Promise<any> => {
	return localService.get("user/blocked/" ).then((res) => res.data).catch(err => console.log(err));
}

export const changePassword = (id : number , id_group : number) : Promise<any> => {
	return localService.get("user/blocked/" ).then((res) => res.data).catch(err => console.log(err));
}
// export const setStatus = (data : FormData) : Promise<any> => {
// 	return localService.post("channels/set-status/", data ).then((res) => res.data).catch(err => console.log(err));
// }
export const setStatus = (id :number , id_group : number , status : Status, until : Date) : Promise<any> => {
	
	return localService.post("channels/set-status/", {id, id_group, status, until} ).then((res) => res.data).catch(err => console.log(err));
}


export const unsetStatus = (data : FormData) : Promise<any> => {
	return localService.post("channels/unset-status/", data ).then((res) => res.data).catch(err => console.log(err));
}






