import Api from '../Api';

export const ForumRequests = {
	getForums: () => {
		return Api.get('/forum');
	},

	getTopics: (id: number) => {
		return Api.get(`/forum/${id}`);
	},

	getComments: (forum_id: any, topic_id: any) => {
		return Api.get(`/forum/${forum_id}/${topic_id}`);
	},

	createTopic: (payload: CreateTopicPayload) => {
		return Api.post('/forum/create_topic', payload);
	},

	postComment: (payload: NewForumCommentPayload) => {
		return Api.post('/forum/comment/post', payload);
	},

	deleteComment: (payload: DeleteForumCommentPayload) => {
		return Api.post('/forum/comment/delete', payload);
	},

	editComment: (payload: EditForumCommentPayload) => {
		return Api.post('forum/comment/edit', payload);
	},
};
