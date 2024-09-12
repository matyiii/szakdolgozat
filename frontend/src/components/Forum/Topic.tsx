type Props = {
	topic: TopicType;
};

const Topic = ({ topic }: Props) => {
	return (
		<div className='w-full h-full p-4 bg-gray-50 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300'>
			<div className='flex'>
				<div className='flex-1'>
					<div className='text-lg font-semibold text-gray-700'>{topic.title}</div>
					<div className='text-sm text-gray-500'>{topic.description}</div>
				</div>
				<div>
					<div className='text-sm text-gray-500'>Created: {topic.user?.name}</div>
					<div className='text-sm text-gray-500'>Last comment: {topic.last_comment?.created_at}</div>
				</div>
			</div>
		</div>
	);
};

export default Topic;
