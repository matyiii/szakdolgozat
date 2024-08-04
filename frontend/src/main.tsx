import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/store.ts';

import App from '@/layout/App.tsx';

import 'rsuite/dist/rsuite-no-reset.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
);
