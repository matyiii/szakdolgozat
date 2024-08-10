import ApiError from '@/components/ApiErrror/ApiError';
import Comments from '@/components/Comment/Comments';
import Model from '@/components/ThreeDModel/Model/Model';
import DataService from '@/service/DataService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const ThreeDModel = () => {
	/* Hooks */
	const { modelId } = useParams();

	/* States */
	const [model, setModel] = useState<ThreeDModelType>();

	/* Effects */
	useEffect(() => {
		DataService.threeD
			.getModelById(modelId)
			.then((res) => {
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
	const onDownloadHandler = () => {
		setModel((prevModel) => {
			if (!prevModel) return prevModel;

			return {
				...prevModel,
				download_count: prevModel?.download_count + 1,
			};
		});
	};

	return (
		<div className='flex flex-col items-center w-full p-4'>
			<div className='w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'>
				{model && (
					<>
						<Model
							model={model}
							updateModel={(model: ThreeDModelType) => {
								setModel(model);
							}}
							onDownload={onDownloadHandler}
						/>
						<Comments
							modelId={model.id}
							comments={model.comments}
							updateModel={(model: ThreeDModelType) => {
								setModel(model);
							}}
							deleteComment={(commentId: number) => {
								setModel((prevModel?: ThreeDModelType) => {
									if (!prevModel) return prevModel;

									return {
										...prevModel,
										comments: prevModel?.comments.filter((c) => c.id !== commentId),
									};
								});
							}}
							changeComment={(newCommentText: string, commentId: number) => {
								setModel((prevModel?: ThreeDModelType) => {
									if (!prevModel) return prevModel;

									return {
										...prevModel,
										comments: prevModel.comments.map((comment) =>
											comment.id === commentId ? { ...comment, text: newCommentText } : comment,
										),
									};
								});
							}}
							editComment={(newComment: CommentType) => {
								setModel((prevModel?: ThreeDModelType) => {
									if (!prevModel) return prevModel;

									return {
										...prevModel,
										comments: prevModel.comments.map((comment) =>
											comment.id === newComment.id ? newComment : comment,
										),
									};
								});
							}}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default ThreeDModel;
