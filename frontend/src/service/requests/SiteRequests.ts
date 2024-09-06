import Api from '../Api';

export const SiteRequests = {
	getCategories: () => {
		return Api.get('/categories');
	},

	search: (query: string) => {
		return Api.get(`/search${query}`);
	},
};
