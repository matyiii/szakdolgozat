import ApiError from '@/components/ApiErrror/ApiError';
import STLViewer from '@/components/STL/STLViewer/STLViewer';
import DataService from '@/service/DataService';
import toast from 'react-hot-toast';
import { Button } from 'rsuite';

type Props = {
	model: ThreeDModelType;
	updateModel: any;
};

const Model = ({ model, updateModel }: Props) => {
	/* Functions */
	const handleLike = () => {
		DataService.threeD
			.like({
				model_id: model?.id as number,
				is_liked: model?.is_liked as boolean,
			})
			.then((res) => {
				console.log(res);
				updateModel(res.data.model);
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
