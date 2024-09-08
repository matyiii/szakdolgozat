import Api from '../Api';

export const ForumRequests = {
	getForums: () => {
		return Api.get('/forum');
	},
	getTopics: (id: number) => {
		return Api.get(`/forum/${id}`);
	},
};
