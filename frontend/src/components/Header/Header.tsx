import DataService from '@/service/DataService';
import { selectUser } from '@/store/auth/authSelector';
import { SET_USER } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { store } from '@/store/store';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'rsuite';
import SearchBar from '@/components/SearchBar/SearchBar';

const Header = () => {
	/*Hooks */
	const navigate = useNavigate();

	/* Selector */
	const user = useAppSelector(selectUser);

	/* Functions */
	const handleLogout = () => {
		DataService.auth
			.logout()
			.then((res) => {
				console.log(res);
				localStorage.removeItem('user');
				store.dispatch(SET_USER(null));
				navigate('/');
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			{user.id ? (
				<Navbar className='flex justify-between items-center'>
					<Navbar.Brand as='div'>
						<NavLink to='/'>PrintIT</NavLink>
					</Navbar.Brand>
					<Nav className='flex-grow flex justify-center'>
						<Nav.Item as='div'>
							<SearchBar />
						</Nav.Item>
					</Nav>
					<Nav pullRight>
						<Nav className='flex items-center'>
							<Nav.Item as='div' className='py-0 m-4'>
								<NavLink to='/discover' className='h-full content-center'>
									Discover
								</NavLink>
							</Nav.Item>
							<Nav.Item as='div' className='py-0 m-4'>
								<NavLink to='/login' className='h-full content-center'>
									Forum
								</NavLink>
							</Nav.Item>
							<Nav.Item as='div'>
								<NavLink to='/upload'>
									<Button appearance='primary'>Upload</Button>
								</NavLink>
							</Nav.Item>
						</Nav>
						<Nav.Menu title={user.name}>
							<Nav.Item as='div'>
								<NavLink to={`profile/${user.name}`}>Profile</NavLink>
							</Nav.Item>
							<Nav.Item onClick={handleLogout}>Logout</Nav.Item>
						</Nav.Menu>
					</Nav>
				</Navbar>
			) : (
				<Navbar className='flex justify-between items-center'>
					<Navbar.Brand as='div'>
						<NavLink to='/'>PrintIT</NavLink>
					</Navbar.Brand>
					<Nav pullRight>
						<Nav.Item as='div'>
							<NavLink to='/discover'>Discover</NavLink>
						</Nav.Item>
						<Nav.Item as='div'>
							<NavLink to='/register'>Sign up</NavLink>
						</Nav.Item>
						<Nav.Item as='div'>
							<NavLink to='/login'>Sign in</NavLink>
						</Nav.Item>
					</Nav>
				</Navbar>
			)}
		</>
	);
};

export default Header;
