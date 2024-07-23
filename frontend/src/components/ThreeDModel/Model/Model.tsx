import ApiError from '@/components/ApiErrror/ApiError';
import STLViewer from '@/components/STL/STLViewer/STLViewer';
import STLViewer2 from '@/components/STL/STLViewer/STLViewer2';
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
				console.log(res.data.model);
				setModel(res.data.model);
			})
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	}, []);

	return (
		<div className='container flex flex-col w-screen h-full bg-green-200 rounded-lg'>
			{model && (
				<div className='m-2 bg-red-200 '>
					<div>{model?.name}</div>
					<div className='bg-yellow-200'>
						<div>
							<STLViewer fileId={model?.files[0].id} />
						</div>
						<div>
							<img src={`http://localhost:8000/storage/${model?.images[0].path}`} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Model;
