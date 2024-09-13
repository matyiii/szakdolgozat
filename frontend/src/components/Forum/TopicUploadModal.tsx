import CustomModal from '@/components/Modal/CustomModal';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, ButtonToolbar, Form, Input } from 'rsuite';

type TopicUploadModalProps = {
	open: boolean;
	onClose: () => void;
	handleSubmit: () => void;
};

export const TopicUploadModal = ({ open, onClose, handleSubmit }: TopicUploadModalProps) => {
	/* State */
	const [form, setForm] = useState<TopicType>({ title: '', description: '' });

	/* Functions */
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
						<Form.Control name='description' onChange={handleFormChange} value={form?.description} />
					</Form.Group>
					<Form.Group>
						<ButtonToolbar className='flex justify-between space-x-2'>
							<NavLink to='/register'>
								<Button appearance='link'>Cancel</Button>
							</NavLink>
							<Button appearance='primary' onClick={handleSubmit}>
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
