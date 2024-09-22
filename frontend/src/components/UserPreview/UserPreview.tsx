import { NavLink } from 'react-router-dom';

type Props = {
	user: UserType;
};

const UserPreview = ({ user }: Props) => {
	return (
		<NavLink
			to={`/users/${user.id}`}
			className='relative bg-slate-200 m-2 rounded-lg shadow-lg hover:bg-slate-300 transition duration-300 ease-in-out hover:cursor-pointer flex flex-col items-center'
		>
			<div className='flex flex-col items-center p-4'>
				<div className='my-2 text-gray-600 text-lg font-semibold'>{user.name ?? 'Anonymous User'}</div>
				<div className='text-gray-500'>{user.models_count ?? 0} Models Uploaded</div>
				<div className='text-gray-500'>Joined: {new Date(user.created_at).toLocaleDateString()}</div>
			</div>
		</NavLink>
	);
};

export default UserPreview;
