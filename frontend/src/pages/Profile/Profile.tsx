import ApiError from '@/components/ApiErrror/ApiError';
import ModelCard from '@/components/Profile/ModelCard';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Profile = () => {
	/* Hooks */
	const { user_id } = useParams();

	/* State */
	const [user, setUser] = useState<UserType>();

	/* Effects */
	useEffect(() => {
		DataService.site
			.getUser(Number(user_id))
			.then((res) => setUser(res.data.user))
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	}, [user_id]);

	return (
		<div className='container flex-1 mx-auto px-20 py-6 mt-6 max-w-6xl'>
			{user ? (
				<div className='flex flex-col space-y-6'>
					<div className='bg-white shadow-md rounded-lg p-6'>
						<h2 className='text-xl font-semibold mb-4'>User Information</h2>
						<p>
							<strong>Name:</strong> {user.name}
						</p>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
						<p>
							<strong>Account Created:</strong> {new Date(user?.created_at as string).toLocaleDateString()}
						</p>
					</div>

					<div className='bg-white shadow-md rounded-lg p-6'>
						<h2 className='text-xl font-semibold mb-4'>Uploaded Models</h2>
						{(user?.models as ThreeDModelType[]).length > 0 ? (
							<div className='space-y-6'>
								{(user?.models as ThreeDModelType[]).map((model) => (
									<ModelCard key={model.id} model={model} />
								))}
							</div>
						) : (
							<p>No models uploaded yet.</p>
						)}
					</div>
				</div>
			) : (
				<div className='bg-orange-100 text-slate-400 p-4 rounded-md mb-4 border border-orange-300'>
					<strong>User not found!</strong>
				</div>
			)}
		</div>
	);
};

export default Profile;
