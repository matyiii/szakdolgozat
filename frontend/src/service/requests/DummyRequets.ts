import Api from '../Api';

export const DummyRequests = {
	test: () => {
		return Api.get('/dummy/test');
	}
};
