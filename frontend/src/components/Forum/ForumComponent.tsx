type Props = {
	forum: ForumType;
};

const ForumComponent = ({ forum }: Props) => {
	return (
		<div className='w-full h-full p-4 bg-gray-50 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300'>
			<div className='text-lg font-semibold text-gray-700'>{forum.name}</div>
			<div className='text-sm text-gray-500'>{forum.description}</div>
		</div>
	);
};

export default ForumComponent;
