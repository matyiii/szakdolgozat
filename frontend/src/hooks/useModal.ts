import { useState } from 'react';

const useModal = () => {
	const [open, setOpen] = useState<boolean>(false);

	const onOpen = () => setOpen(true);
	const onClose = () => setOpen(false);

	return {
		open,
		onOpen,
		onClose,
	};
};

export default useModal;
