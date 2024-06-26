import Router from '@/routes/Router';
import Header from '@/components/Header/Header';
import Copyright from '@/components/Copyright/Copyright';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <Header />
            <main className='flex items-center justify-center flex-grow h-full'>
                <Router />
            </main>
            <footer>
                <Copyright />
            </footer>
            <div>
                <Toaster />
            </div>
        </>
    );
}

export default App;
