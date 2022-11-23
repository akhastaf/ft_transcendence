import axios from "axios";
import { localService } from "../../api/axios";

export const getCurrentUser = (id: number): Promise<any> => {
	return localService.get("/user/"+id).then(res => res.data).catch(err => console.log(err));
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