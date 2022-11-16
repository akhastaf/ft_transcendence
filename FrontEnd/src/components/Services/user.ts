import axios from "axios";
import { localService } from "../../api/axios";

export const getCurrentUser = (id: number): Promise<any> => {
	return localService.get("/user/"+id).then(res => res.data);
};