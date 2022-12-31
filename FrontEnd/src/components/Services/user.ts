import { localService } from "../../api/axios";
import { Status } from "../Types/types";

export const getCurrentUser = (): Promise<any> => {
	return localService.get("user/me").then(res=> res.data).catch(err => Promise.reject(err));
};
export const getAUser = (id: number): Promise<any> => {
	return localService.get("/user/"+id).then(res => res.data).catch(err => Promise.reject(err));
};

export const getBlockedList = () : Promise<any> => {
	return localService.get("channels/blocked-users").then((res) => res.data).catch(err => Promise.reject(err));
};

export const getMyRole = (id: number) : Promise<any> => {
	return localService.get("channels/role/" +id).then((res) => res.data).catch(err => Promise.reject(err));
}
export const AddFriend = (id: number) : Promise<any> => {
	return localService.get("/user/add/" +id).then((res) => res.data).catch(err => Promise.reject(err));
}
export const BlockFriend = (id: number) : Promise<any> => {
	return localService.get("/user/block/" +id).then((res) => res.data).catch(err => Promise.reject(err));
}
export const GetFriends = () : Promise<any> => {
	return localService.get("channels/friend-users").then((res) => { return res.data}).catch(err => Promise.reject(err));
}
export const GetBlockedFriends = () : Promise<any> => {
	return localService.get("user/blocked/" ).then((res) => res.data).catch(err => Promise.reject(err));
}
export const setADmin = (id_user : number, id_group : number) : Promise<any> => {
	return localService.post("channels/set-admin/" ,{id_user, id_group}).then((res) => res.data).catch(err => Promise.reject(err));
}
export const unsetADmin = (id_user : number, id_group : number) : Promise<any> => {
	return localService.post("channels/unset-admin/", {id_user, id_group} ).then((res) => res.data).catch(err => Promise.reject(err));
}
export const ChangePrivacy = (id_group : number , password : string) : Promise<any> => {
	return localService.post("channels/password/" , {id_group, password}).then((res) => res.data).catch(err => Promise.reject(err));
}


export const changePassword = (id_group : number , old_password : string, new_password : string) : Promise<any> => {
	return localService.patch("channels/password/" ,{id_group, old_password, new_password}).then((res) => res.data).catch(err => Promise.reject(err));
}
export const deletePassword = (id_group : number , password : string) : Promise<any> => {
	return localService.delete("channels/password/" , {data : {id_group, password}}).then((res) => res.data).catch(err => Promise.reject(err));
}
// export const setStatus = (data : FormData) : Promise<any> => {
// 	return localService.post("channels/set-status/", data ).then((res) => res.data).catch(err => console.log(err));
// }
export const setStatus = (id :number , id_group : number , status : Status, until : Date) : Promise<any> => {
	return localService.post("channels/set-status/", 
	{
		id_user : id,
		id_group : id_group,
		status : status,
		until : until
	} ).then((res) => res.data).catch(err => Promise.reject(err));
}


export const unsetStatus = (id_user : number , id_group : number) : Promise<any> => {
	return localService.post("channels/unset-status/", {id_user, id_group} ).then((res) => res.data).catch(err => Promise.reject(err));
}

export const updateInfo = (data : FormData) : Promise<any> => {
	return localService.patch("user/", data)
			.then((res) => res.data)
			.catch((error) => {
				return Promise.reject(error);
			});
}

export const kick = () : Promise<any> => {
	return localService.post("",)
}


export const getUsergame = (id : number) : Promise<any> => {
	return localService.get("/game/user/" + id).then((res) => res.data).catch((err) => Promise.reject(err));
}
// export const enableTwoFa = ()

