import DataService from '@/service/DataService';
import { useState } from 'react';
import { Button, ButtonToolbar, Form, Uploader } from 'rsuite';
import { FileType } from 'rsuite/esm/Uploader';

type ThreeDUploadFormType = {
	name: string;
	files: FileType[];
};

const ThreeDUploadForm = () => {
	/* States */
	const [form, setForm] = useState<ThreeDUploadFormType>({ name: 'teszt', files: [] });

	/* Functions */
	const handleFormChange = (value: any, e: any) => {
		const { name } = e.currentTarget;
		setForm((prevState: any) => {
			return {
				...prevState,
				[name]: value
			};
		});
	};

	const handleFileUpload = (newFiles: FileType[]) => {
		setForm((prevState: any) => {
			return {
				...prevState,
				files: newFiles
			};
		});
	};

	const handleSubmit = () => {
		console.log(form);
		DataService.threeD
			.upload(form)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Form>
				<Form.Group controlId='model_name'>
					<Form.ControlLabel>Model Name</Form.ControlLabel>
					<Form.Control name='model_name' onChange={handleFormChange} value={form.name} />
				</Form.Group>
				<Uploader
					draggable
					multiple
					action=''
					autoUpload={false}
					name='files'
					onChange={handleFileUpload}
				>
					<div className='flex items-center justify-center'>
						<span>Click or Drag files to this area to upload</span>
					</div>
				</Uploader>
				<Form.Group>
					<ButtonToolbar>
						<Button appearance='primary' onClick={handleSubmit}>
							Submit
						</Button>
						<Button appearance='default'>Cancel</Button>
					</ButtonToolbar>
				</Form.Group>
			</Form>
		</div>
	);
};

export default ThreeDUploadForm;
