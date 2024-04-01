import { useEffect } from 'react';
import DataService from '@/service/DataService';

export const Dummy = () => {
	useEffect(() => {
		DataService.dummy.test().then((res) => console.log(res));
	}, []);

	return (
		<div>
			<h1>Dummy</h1>
		</div>
	);
};

export default Dummy;
