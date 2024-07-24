import Comment from '@/components/Comment/Comment';
import NewComment from '@/components/Comment/NewComment';

const DUMMY_DATA: CommentType[] = [
	{
		id: 1,
		model_id: 1,
		message: 'This is the first comment.',
		user: {
			id: 101,
			name: 'user1',
			email: 'user1@example.com',
		},
		created_at: '2023-07-24T10:00:00Z',
		updated_at: '2023-07-24T10:00:00Z',
	},
	{
		id: 2,
		model_id: 1,
		message: 'This is the second comment.',
		user: {
			id: 102,
			name: 'user2',
			email: 'user2@example.com',
		},
		created_at: '2023-07-24T11:00:00Z',
		updated_at: '2023-07-24T11:00:00Z',
	},
	{
		id: 3,
		model_id: 1,
		message: 'This is the third comment.',
		user: {
			id: 103,
			name: 'user3',
			email: 'user3@example.com',
		},
		created_at: '2023-07-24T12:00:00Z',
		updated_at: '2023-07-24T12:00:00Z',
	},
];

const Comments = () => {
	return (
		<div className='container flex flex-col w-screen bg-purple-200 rounded-lg p-2'>
			<NewComment />
			{DUMMY_DATA.map((d: CommentType) => (
				<Comment key={d.id} comment={d} />
			))}
		</div>
	);
};

export default Comments;
