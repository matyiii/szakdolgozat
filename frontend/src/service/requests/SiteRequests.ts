import Api from '../Api';

export const SiteRequests = {
    getCategories: () => {
        return Api.get('/categories');
    },
};
