import ApiError from '@/components/ApiErrror/ApiError';
import STLViewer from '@/components/STL/STLViewer/STLViewer';
import STLViewer2 from '@/components/STL/STLViewer/STLViewer2';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Button } from 'rsuite';

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

	/* Functions */
	const handleLike = () => {
		DataService.threeD
			.like({
				model_id: model?.id as number,
				is_liked: model?.is_liked as boolean,
			})
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
	};

	return (
		<div className='container flex flex-col w-screen h-full bg-green-200 rounded-lg'>
			{model && (
				<div className='m-2 bg-red-200 '>
					<div>{model?.name}</div>
					<div>
						<div>{`Like count: ${model?.like_count}`}</div>
						<div>
							<Button appearance='primary' onClick={handleLike}>
								{`${model?.is_liked ? 'Unlike' : 'Like'}`}
							</Button>
						</div>
					</div>
					<div className='bg-yellow-200'>
						<div>
							<STLViewer fileId={model?.files[0].id} />
						</div>
						<div>
							<img
								src={`${import.meta.env.VITE_STORAGE_API}${model?.images[0].path}`}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Model;
