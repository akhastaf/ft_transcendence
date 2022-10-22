import axios from "axios";

export const getAllUsers = (): Promise<any> => {
	return axios.get("/user/").then(res => res.data);
};
