import { Modal } from 'rsuite';

type Props = {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
	className?: string;
};

const CustomModal = ({ children, open, onClose, className }: Props) => {
	return (
		<Modal open={open} onClose={onClose} className={className}>
			<Modal.Header />
			<Modal.Body>{children}</Modal.Body>
		</Modal>
	);
};

export default CustomModal;
