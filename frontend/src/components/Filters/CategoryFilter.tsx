import { useAppSelector } from '@/store/hooks';
import { selectCategories } from '@/store/site/siteSelector';
import { useSearchParams } from 'react-router-dom';
import { SelectPicker } from 'rsuite';

type Props = {
	onFilterChange: (filterName: string, value: string) => void;
	onClean: (filterName: string) => void;
};

export const CategoryFilter = ({ onFilterChange, onClean }: Props) => {
	/* Hooks */
	const [searchParams] = useSearchParams();

	/* Selectors */
	const categories = useAppSelector(selectCategories);

	const categoryId = searchParams.get('category_id');

	return (
		<div>
			<SelectPicker
				className='w-52'
				placeholder='Filter by category'
				searchable={false}
				data={(categories as CategoryType[]).map((category) => ({
					label: category.name,
					value: category.id?.toString(),
				}))}
				defaultValue={categoryId || undefined}
				onSelect={(_, item) => onFilterChange('category_id', item.value as string)}
				onClean={() => onClean('category_id')}
			/>
		</div>
	);
};
