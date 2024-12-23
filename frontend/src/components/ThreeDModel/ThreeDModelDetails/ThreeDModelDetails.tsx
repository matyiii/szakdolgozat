import ApiError from '@/components/ApiErrror/ApiError';
import useUser from '@/hooks/useUser';
import DataService from '@/service/DataService';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';

type Props = {
	model: ThreeDModelType;
	updateModel: any;
	onDownload: any;
};

const ThreeDModelDetails = ({ model, updateModel, onDownload }: Props) => {
	/* Hooks */
	const { isAdmin } = useUser();
	const navigate = useNavigate();

	/* Functions */
	const handleLike = () => {
		DataService.threeD
			.like({
				model_id: model?.id as number,
				is_liked: model?.is_liked as boolean,
			})
			.then((res) => {
				updateModel(res.data.model);
			})
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	};

	const downloadFiles = () => {
		DataService.threeD
			.download(model?.id)
			.then((res) => {
				onDownload();

				// Create a Blob from the response data
				const blob = new Blob([res.data], { type: res.headers['content-type'] });

				// Create a link element to trigger the download
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				const fileName = model.name;

				// Set the download attribute with the filename
				link.setAttribute('download', fileName);

				// Append link to the body and trigger the download
				document.body.appendChild(link);
				link.click();

				// Clean up the link and revoke the URL
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const approveHandler = (modelId: number, isApproved: boolean) => {
		const payload: ApproveModelPayload = {
			model_id: modelId,
			is_approved: isApproved,
		};
		DataService.admin
			.approveModel(payload)
			.then((res) => {
				navigate(-1);
				toast.success(res.data.message);
			})
			.catch((err) => console.log(err));
	};

	const deleteModelHandler = (modelId: number) => {
		const payload: DeleteModelPayload = {
			model_id: modelId,
		};

		DataService.admin
			.deleteModel(payload)
			.then((res) => {
				navigate(-1);
				toast.success(res.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='flex flex-col bg-white border border-gray-200 shadow-md p-2 rounded-lg'>
			<h1 className='text-lg font-semibold text-gray-800 mb-4'>Details</h1>
			<p className='text-sm text-gray-600 mb-2'>
				<span className='font-medium'>Name:</span> {model?.name}
			</p>
			<p className='text-sm text-gray-600 mb-2'>
				<span className='font-medium'>Category:</span> {model?.category?.name}
			</p>
			<p className='text-sm text-gray-600 mb-2'>
				<span className='font-medium'>Uploaded at:</span> {model?.created_at}
			</p>
			<div className='text-sm text-gray-600 mb-4'>
				<p className='font-medium'>Uploaded by:</p>
				<NavLink to={`/profile/${model?.user?.id}`} className='text-blue-500 underline'>
					{model?.user?.name}
				</NavLink>
			</div>
			<p className='text-sm text-gray-600 mb-2'>{`Like count: ${model?.like_count}`}</p>
			<p className='text-sm text-gray-600 mb-4'>{`Download count: ${model?.download_count}`}</p>

			<div className='flex flex-col gap-1'>
				<div className='flex space-x-1'>
					<Button appearance='primary' className='w-full bg-blue-500 hover:bg-blue-600' onClick={handleLike}>
						{`${model?.is_liked ? 'Unlike' : 'Like'}`}
					</Button>
					<Button appearance='ghost' className='w-full bg-gray-100 hover:bg-gray-200' onClick={downloadFiles}>
						Download Model
					</Button>
				</div>

				{/* Approve Model*/}
				{isAdmin && !model.approved_at && !model.is_approved && (
					<div className='flex space-x-1'>
						<Button appearance='primary' className='w-full' color='green' onClick={() => approveHandler(model.id, true)}>
							Approve
						</Button>
						<Button appearance='primary' className='w-full' color='red' onClick={() => approveHandler(model.id, false)}>
							Deny
						</Button>
					</div>
				)}

				{/* Delete Model */}
				{isAdmin && model.approved_at && (
					<div className='flex'>
						<Button appearance='primary' className='w-full' color='red' onClick={() => deleteModelHandler(model.id)}>
							Delete
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ThreeDModelDetails;
