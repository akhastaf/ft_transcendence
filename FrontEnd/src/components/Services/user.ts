import { localService } from "../../api/axios";

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
	return localService.get("user/friends").then((res) => res.data).catch(err => console.log(err));
}
export const GetBlockedFriends = () : Promise<any> => {
	return localService.get("user/blocked/" ).then((res) => res.data).catch(err => console.log(err));
}


