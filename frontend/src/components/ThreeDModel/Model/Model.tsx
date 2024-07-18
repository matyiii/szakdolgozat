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

	console.log(model);
	console.log(model?.files[0]?.path);
	return (
		<div className='flex flex-col container rounded-lg bg-green-200 w-screen h-full'>
			{model && (
				<div className=' bg-red-200 m-2'>
					<div>{model?.name}</div>
					<div className='bg-yellow-200'>
						<div>
							<STLViewer path={model?.files[0]?.path} />
							<STLViewer2 url={`http://localhost:8000/storage/${model?.files[0].path}`} />
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
