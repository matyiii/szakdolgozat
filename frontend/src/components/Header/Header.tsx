import DataService from '@/service/DataService';
import { SET_USER } from '@/store/auth/authSlice';
import { store } from '@/store/store';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'rsuite';
import SearchBar from '@/components/SearchBar/SearchBar';
import useUser from '@/hooks/useUser';

const Header = () => {
	/*Hooks */
	const navigate = useNavigate();
	const { user, isAdmin } = useUser();

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
						<NavLink to='/' className='font-bold'>
							PrintIT
						</NavLink>
					</Navbar.Brand>
					<Nav className='flex-grow flex justify-center'>
						<Nav.Item as='div'>
							<SearchBar />
						</Nav.Item>
					</Nav>
					<Nav pullRight>
						<Nav className='flex items-center'>
							<Nav.Item as={NavLink} className='py-0 m-4' to='/discover'>
								Discover
							</Nav.Item>
							<Nav.Item as={NavLink} className='py-0 m-4' to='/forum'>
								Forum
							</Nav.Item>
							<Nav.Item as={NavLink} to='/upload'>
								<Button appearance='primary'>Upload</Button>
							</Nav.Item>
						</Nav>
						<Nav.Menu title={user.name}>
							<Nav.Item as={NavLink} to={`profile/${user.id}`}>
								Profile
							</Nav.Item>
							{isAdmin && (
								<Nav.Item as={NavLink} to='/admin'>
									Admin
								</Nav.Item>
							)}
							<Nav.Item onClick={handleLogout}>Logout</Nav.Item>
						</Nav.Menu>
					</Nav>
				</Navbar>
			) : (
				<Navbar>
					<Navbar.Brand as='div'>
						<NavLink to='/'>PrintIT</NavLink>
					</Navbar.Brand>
					<Nav pullRight>
						<Nav.Item as={NavLink} to='/register'>
							Sign up
						</Nav.Item>
						<Nav.Item as={NavLink} to='/login'>
							Sign in
						</Nav.Item>
					</Nav>
				</Navbar>
			)}
		</>
	);
};

export default Header;
