import Api from '../Api';

export const ThreeDRequest = {
	upload: (payload: any) => {
		return Api.post('/3d/upload', payload);
	},

	getMostLikedModels: () => {
		return Api.get('/discover/most_liked_models');
	},

	getModelById: (id: any) => {
		return Api.get(`/3d/getModel?id=${id}`);
	},
};
