import Api from '../Api';

export const AdminRequests = {
	getModelsInReview: () => {
		return Api.get('/admin/models_in_review');
	},

	approveModel: (payload: ApproveModelPayload) => {
		return Api.post('/admin/approve_model', payload);
	},
};
