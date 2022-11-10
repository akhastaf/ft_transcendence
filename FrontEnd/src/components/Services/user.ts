import axios from "axios";
import { localService } from "../../api/axios";

export const getCurrentUser = (): Promise<any> => {
	return localService.get("/user?id=1").then(res => res.data);
};
