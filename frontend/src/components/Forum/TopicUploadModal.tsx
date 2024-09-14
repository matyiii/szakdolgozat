import { forwardRef, useState, useEffect } from 'react';
import { Button, ButtonToolbar, Form, Input } from 'rsuite';
import CustomModal from '@/components/Modal/CustomModal';

type TopicUploadModalProps = {
	open: boolean;
	onClose: any;
	handleSubmit: any;
};

const Textarea = forwardRef((props, ref) => <Input {...props} as='textarea' />);

export const TopicUploadModal = ({ open, onClose, handleSubmit }: TopicUploadModalProps) => {
	const initialFormState = { title: '', description: '' };
	const [form, setForm] = useState<TopicType>(initialFormState);

	useEffect(() => {
		if (open) {
			setForm(initialFormState);
		}
	}, [open]);

	const handleFormChange = (value: any, e: any) => {
		const { name } = e.currentTarget;
		setForm((prevState: TopicType) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<CustomModal open={open} onClose={onClose}>
			<div className='flex items-center justify-center h-full'>
				<Form>
					<Form.Group controlId='title'>
						<Form.ControlLabel>Title</Form.ControlLabel>
						<Form.Control name='title' onChange={handleFormChange} value={form?.title} />
					</Form.Group>
					<Form.Group controlId='description'>
						<Form.ControlLabel>Description</Form.ControlLabel>
						<Form.Control name='description' accepter={Textarea} onChange={handleFormChange} value={form?.description} />
					</Form.Group>
					<Form.Group>
						<ButtonToolbar className='flex justify-between space-x-2'>
							<Button appearance='link' onClick={onClose}>
								Cancel
							</Button>
							<Button appearance='primary' onClick={() => handleSubmit(form)}>
								Add
							</Button>
						</ButtonToolbar>
					</Form.Group>
				</Form>
			</div>
		</CustomModal>
	);
};

export default TopicUploadModal;
