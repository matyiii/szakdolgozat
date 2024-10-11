import { useSearchParams } from 'react-router-dom';
import { SelectPicker } from 'rsuite';

type SortOption = {
	label: string;
	value: string;
};

type Props = {
	onSortChange: (filterName: string, value: string) => void;
	onClean: (filterName: string) => void;
};

const OrderBy = ({ onSortChange, onClean }: Props) => {
	const sortOptions: SortOption[] = [
		{ label: 'Newest', value: 'newest' },
		{ label: 'Oldest', value: 'oldest' },
		{ label: 'Most Liked', value: 'most_liked' },
		{ label: 'Most Downloaded', value: 'most_downloaded' },
	];

	/* Hooks */
	const [searchParams] = useSearchParams();

	const orderBy = searchParams.get('order_by');

	return (
		<div>
			<SelectPicker
				className='w-52'
				placeholder='Sort by'
				searchable={false}
				data={sortOptions}
				defaultValue={orderBy || undefined}
				onSelect={(_, item) => onSortChange('order_by', item.value as string)}
				onClean={() => onClean('order_by')}
			/>
		</div>
	);
};

export default OrderBy;
