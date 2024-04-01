import Router from '@/routes/Router';
import Header from '@/components/Header/Header';

import './App.css';

function App() {
	return (
		<>
			<Header />
			<main>
				<Router />
			</main>
		</>
	);
}

export default App;
