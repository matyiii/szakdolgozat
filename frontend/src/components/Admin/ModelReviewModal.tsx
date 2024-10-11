import CustomModal from '../Modal/CustomModal';
import Model from '../ThreeDModel/Model/Model';

type Props = {
	open: boolean;
	onClose: any;
	handleSubmit?: any;
	model: ThreeDModelType;
};

export const ModelReviewModal = ({ open, onClose, handleSubmit, model }: Props) => {
	return (
		<CustomModal open={open} onClose={onClose} className='w-[80%]'>
			<Model model={model} />
		</CustomModal>
	);
};
