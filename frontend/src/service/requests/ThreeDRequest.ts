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
};
