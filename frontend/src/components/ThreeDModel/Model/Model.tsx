import STLViewer from '@/components/STL/STLViewer/STLViewer';
import ThreeDModelDetails from '@/components/ThreeDModel/ThreeDModelDetails/ThreeDModelDetails';

type Props = {
	model: ThreeDModelType;
	updateModel: any;
	onDownload: any;
};

const Model = ({ model, updateModel, onDownload }: Props) => {
	return (
		<div className='p-2 bg-green-200 rounded-lg'>
			{model && (
				<div className='flex bg-red-200'>
					<div className='w-3/4 bg-yellow-200'>
						<div className='h-96'>
							<STLViewer fileId={model?.files[0].id} />
						</div>
						<div>
							<img
								className='h-40'
								src={
									model?.images && model.images.length > 0
										? `${import.meta.env.VITE_STORAGE_API}${model.images[0].path}`
										: '/images/placeholder.PNG'
								}
								alt='Model'
							/>
						</div>
					</div>
					<div className='w-1/4'>
						<ThreeDModelDetails model={model} updateModel={updateModel} onDownload={onDownload} />
					</div>
				</div>
			)}
		</div>
	);
};
export default Model;
