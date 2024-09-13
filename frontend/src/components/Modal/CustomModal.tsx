import { Modal } from 'rsuite';

type Props = {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
};

const CustomModal = ({ children, open, onClose }: Props) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Modal.Header />
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	);
};

export default CustomModal;
