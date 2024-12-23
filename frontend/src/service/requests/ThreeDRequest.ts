import Api from '../Api';

export const ThreeDRequest = {
	upload: (payload: any) => {
		return Api.post('/3d/upload', payload);
	},

	getHighlightedModels: () => {
		return Api.get('/3d/highlighted_models');
	},

	getMostLikedModels: () => {
		return Api.get('/3d/most_liked_models');
	},

	discoverModels: () => {
		return Api.get('/3d/discover');
	},

	getModelById: (id: any) => {
		return Api.get(`/3d/getModel?id=${id}`);
	},

	like: (payload: LikePayload) => {
		return Api.post('/3d/like', payload);
	},

	postComment: (payload: CommentPayload) => {
		return Api.post('/3d/comment/post', payload);
	},

	deleteComment: (payload: DeleteCommentPayload) => {
		return Api.post('/3d/comment/delete', payload);
	},

	editComment: (payload: EditCommentPayload) => {
		return Api.post('/3d/comment/edit', payload);
	},

	download: (id: number) => {
		return Api.get(`/3d/download?model_id=${id}`, { responseType: 'blob' });
	},

	getFilteredModels: (options: FilterOptions) => {
		return Api.get('/3d/filtered_models', { params: options });
	},
};
