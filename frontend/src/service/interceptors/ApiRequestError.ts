const ApiRequestError = (error: any) => {
	return Promise.reject(error);
};

export default ApiRequestError;
