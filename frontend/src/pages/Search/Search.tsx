import DataService from '@/service/DataService';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const Search = () => {
	/* Hooks */
	//const [searchParams] = useSearchParams();
	const { search } = useLocation();

	useEffect(() => {
		if (search) {
			console.log(`Searching for: ${search}`);
			DataService.site.search(search);
		}
	}, [search]);

	return <div>Search</div>;
};

export default Search;
