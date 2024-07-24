import DataService from '@/service/DataService';
import { useAppSelector } from '@/store/hooks';
import { selectCategories } from '@/store/site/siteSelector';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button, ButtonToolbar, Form, SelectPicker, Uploader } from 'rsuite';
import { FileType } from 'rsuite/esm/Uploader';
import ApiError from '../ApiErrror/ApiError';

type ThreeDUploadFormType = {
	model_name: string;
	category_id: number | null;
	files: FileType[];
};

const ThreeDUploadForm = () => {
	/* Selectors */
	const categories = useAppSelector(selectCategories);

	/* States */
	const [form, setForm] = useState<ThreeDUploadFormType>({
		model_name: '',
		category_id: null,
		files: [],
	});

	/* Functions */
	const handleFormChange = (value: any, e: any) => {
		const { name } = e.currentTarget;
		setForm((prevState: ThreeDUploadFormType) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleFileUpload = (newFiles: FileType[]) => {
		setForm((prevState: any) => {
			return {
				...prevState,
				files: newFiles,
			};
		});
	};

	const handleSubmit = () => {
		console.log(form);

		const formData = new FormData();
		formData.append('model_name', form.model_name);
		formData.append('category_id', `${form.category_id}`);

		form.files.forEach((file, index) => {
			if (file.blobFile && file.name && file.status && file.fileKey) {
				formData.append(`files[${index}][blobFile]`, file.blobFile);
				formData.append(`files[${index}][name]`, file.name);
				formData.append(`files[${index}][status]`, file.status);
			} else {
				console.error(`File blobFile at index ${index} is undefined.`);
			}
		});

		DataService.threeD
			.upload(formData)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				toast.custom(<ApiError message={err.response.data} />, {
					duration: 5000,
				});
			});
	};

	return (
		<div>
			<Form>
				<Form.Group controlId='model_name'>
					<Form.ControlLabel>Model Name</Form.ControlLabel>
					<Form.Control name='model_name' onChange={handleFormChange} value={form.model_name} />
				</Form.Group>
				<Form.Group controlId='category'>
					<Form.ControlLabel>Category</Form.ControlLabel>
					<SelectPicker
						placeholder='Select category'
						searchable={false}
						data={(categories as CategoryType[]).map((category) => ({
							label: category.name,
							value: category.id,
						}))}
						onSelect={(_, item) => {
							setForm((prevState: ThreeDUploadFormType) => {
								return {
									...prevState,
									category_id: item.value as number,
								};
							});
						}}
					/>
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
