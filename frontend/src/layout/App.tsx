import Router from '@/routes/Router';
import Header from '@/components/Header/Header';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'rsuite';
import { useAppSelector } from '@/store/hooks';
import { selectIsLoading } from '@/store/site/siteSelector';
import Footer from '@/components/Footer/Footer';

function App() {
	const isLoading = useAppSelector(selectIsLoading);

	return (
		<>
			<Header />
			<main className='flex flex-col items-center justify-center flex-grow w-full'>
				<Router />
				{isLoading && (
					<Loader size='lg' className='absolute z-40 flex items-center justify-center w-full h-full bg-white bg-opacity-80' />
				)}
			</main>
			<Footer />
			<div>
				<Toaster />
			</div>
		</>
	);
}

export default App;
