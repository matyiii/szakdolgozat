import { useState } from 'react';
import STLViewer from '@/components/STL/STLViewer/STLViewer';
import ThreeDModelDetails from '@/components/ThreeDModel/ThreeDModelDetails/ThreeDModelDetails';
import CustomModal from '@/components/Modal/CustomModal';
import { Carousel } from 'rsuite';

type Props = {
	model: ThreeDModelType;
	updateModel?: any;
	onDownload?: any;
};

const Model = ({ model, updateModel, onDownload }: Props) => {
	const [openModal, setOpenModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// Group images in sets of 3 for carousel slides
	const groupedImages = [];
	if (model?.images && model.images.length > 0) {
		for (let i = 0; i < model.images.length; i += 3) {
			groupedImages.push(model.images.slice(i, i + 3));
		}
	}

	const handleImageClick = (imagePath: string) => {
		setSelectedImage(imagePath);
		setOpenModal(true);
	};

	return (
		<div className='p-4 bg-gray-100 rounded-lg'>
			{model && (
				<div className='flex flex-col md:flex-row bg-white shadow-sm rounded-lg'>
					<div className='w-full md:w-3/4 bg-gray-50 p-4 rounded-lg'>
						<div className='h-96 bg-gray-200 rounded-lg'>
							<STLViewer fileId={model?.files[0].id} />
						</div>

						<div className='mt-4'>
							<Carousel className='h-full' autoplay={false} placement='bottom'>
								{groupedImages.length > 0 ? (
									groupedImages.map((group, index) => (
										<div key={index} className='flex justify-evenly bg-slate-50'>
											{group.map((image, imgIndex) => (
												<img
													key={imgIndex}
													className='h-40 w-auto object-cover rounded-lg shadow-md hover:cursor-pointer'
													src={`${import.meta.env.VITE_STORAGE_API}${image.path}`}
													alt={`Model Image ${imgIndex + 1}`}
													onClick={() => handleImageClick(`${import.meta.env.VITE_STORAGE_API}${image.path}`)} // Image click handler
												/>
											))}
										</div>
									))
								) : (
									<div className='flex justify-evenly'>
										<img
											className='h-40 w-auto object-cover rounded-lg shadow-md'
											src='/images/placeholder.PNG'
											alt='Placeholder'
										/>
									</div>
								)}
							</Carousel>
						</div>
					</div>

					<div className='w-full md:w-1/4 mt-4 md:mt-0 p-2 bg-gray-50 rounded-lg shadow-inner'>
						<ThreeDModelDetails model={model} updateModel={updateModel} onDownload={onDownload} />
					</div>
				</div>
			)}

			{selectedImage && (
				<CustomModal open={openModal} onClose={() => setOpenModal(false)}>
					<img src={selectedImage} alt='Selected Model Image' className='w-full h-auto' />
				</CustomModal>
			)}
		</div>
	);
};

export default Model;
