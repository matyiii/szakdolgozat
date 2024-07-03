import { SET_LOADER } from "@/store/site/siteSlice";
import { store } from "@/store/store";
import { AxiosResponse } from "axios";

const ApiResponseInterceptor = (response: AxiosResponse) => {
	store.dispatch(SET_LOADER(false));

	return response;
}

export default ApiResponseInterceptor;