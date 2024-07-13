import ApiError from '@/components/ApiErrror/ApiError';
import DataService from '@/service/DataService';
import { ThreeDModelType } from '@/shared';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Model = () => {
	const { modelId } = useParams();

	/* States */
	const [model, setModel] = useState<ThreeDModelType>();

	/* Effects */
	useEffect(() => {
		DataService.threeD
			.getModelById(modelId)
			.then((res) => {
				console.log(res);
				setModel(res.data.model);
			})
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	}, []);

	return <div>Model</div>;
};
export default Model;
