import { NavLink } from 'react-router-dom';

type Props = {
	models: ThreeDModelType[];
};

const ModelsInReview = ({ models }: Props) => {
	return (
		<>
			<div className='flex h-fit flex-col bg-white border border-gray-200 shadow-lg rounded-lg w-full max-w-5xl p-6'>
				<h1 className='text-2xl font-semibold mb-6 text-gray-800'>Models in Review</h1>
				<div>
					<table className='min-w-full text-left text-sm'>
						<thead>
							<tr className='border-b bg-gray-100'>
								<th className='py-2 px-4'>Model's Name</th>
								<th className='py-2 px-4'>Category</th>
								<th className='py-2 px-4'>User</th>
								<th className='py-2 px-4'>Date of Upload</th>
								<th className='py-2 px-4'></th>
							</tr>
						</thead>
						<tbody>
							{models?.map((model, index) => (
								<tr key={index} className='border-b hover:bg-gray-50'>
									<td className='py-2 px-4'>{model.name}</td>
									<td className='py-2 px-4'>{model.category.name}</td>
									<td className='py-2 px-4'>{model.user.name}</td>
									<td className='py-2 px-4'>{model.created_at}</td>
									<td className='py-2 px-4'>
										<NavLink to={`/models/${model.id}`}>Details</NavLink>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default ModelsInReview;
