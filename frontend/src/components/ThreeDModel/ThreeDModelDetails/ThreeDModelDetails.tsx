import ApiError from '@/components/ApiErrror/ApiError';
import DataService from '@/service/DataService';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { Button } from 'rsuite';

type Props = {
	model: ThreeDModelType;
	updateModel: any;
	onDownload: any;
};

const ThreeDModelDetails = ({ model, updateModel, onDownload }: Props) => {
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

	return (
		<div className='flex flex-col bg-orange-200 m-1 p-2 rounded-lg'>
			<h1>Details:</h1>
			<p>Name: {model?.name}</p>
			<p>Category: {model?.category?.name}</p>
			<p>Uploaded at: {model?.created_at}</p>
			<div>
				<p>Uploaded by:</p>
				<NavLink to={`/profile/${model?.user?.name}`} className='underline'>
					{model?.user?.name}
				</NavLink>
			</div>
			<p>{`Like count: ${model?.like_count}`}</p>
			<p>{`Download count: ${model?.download_count}`}</p>
			<p className='my-2'>
				<Button appearance='primary' onClick={handleLike}>{`${model?.is_liked ? 'Unlike' : 'Like'}`}</Button>
			</p>
			<p>
				<Button appearance='primary' onClick={downloadFiles}>
					Download Model
				</Button>
			</p>
		</div>
	);
};

export default ThreeDModelDetails;
