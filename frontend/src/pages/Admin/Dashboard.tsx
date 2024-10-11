import ModelsInReview from '@/components/Admin/ModelsInReview';
import ApiError from '@/components/ApiErrror/ApiError';
import useUser from '@/hooks/useUser';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
	/* Hooks */
	const { isAdmin } = useUser();

	/* States */
	const [modelsInReview, setModelsInReview] = useState<ThreeDModelType[]>([]);

	/* Effects */
	useEffect(() => {
		DataService.admin
			.getModelsInReview()
			.then((res) => setModelsInReview(res.data.models))
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	}, []);

	return (
		isAdmin && (
			<div className='flex flex-1 w-full justify-center p-10'>
				<ModelsInReview models={modelsInReview} />
			</div>
		)
	);
};

export default AdminDashboard;
