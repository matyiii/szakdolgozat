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
		<div>
			{model && (
				<>
					<Model
						model={model}
						updateModel={(model: ThreeDModelType) => {
							setModel(model);
						}}
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
									comments: prevModel?.comments.filter(
										(c) => c.id !== commentId,
									),
								};
							});
						}}
						changeComment={(newCommentText: string, commentId: number) => {
							setModel((prevModel?: ThreeDModelType) => {
								if (!prevModel) return prevModel;

								return {
									...prevModel,
									comments: prevModel.comments.map((comment) =>
										comment.id === commentId
											? { ...comment, text: newCommentText }
											: comment,
									),
								};
							});
						}}
					/>
				</>
			)}
		</div>
	);
};

export default ThreeDModel;
