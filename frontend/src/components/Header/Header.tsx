import DataService from '@/service/DataService';
import { SET_USER } from '@/store/auth/authSlice';
import { store } from '@/store/store';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'rsuite';
import SearchBar from '@/components/SearchBar/SearchBar';
import useUser from '@/hooks/useUser';
import { useState } from 'react';

const Header = () => {
	/* Hooks */
	const navigate = useNavigate();
	const { user, isAdmin } = useUser();

	/* State */
	const [menuOpen, setMenuOpen] = useState(false);

	/* Functions */
	const handleLogout = () => {
		DataService.auth
			.logout()
			.then((res) => {
				localStorage.removeItem('user');
				store.dispatch(SET_USER(null));
				navigate('/');
			})
			.catch((err) => console.log(err));
	};

	return (
		<Navbar className='flex flex-wrap items-center justify-between md:flex-nowrap'>
			<Navbar.Brand as='div'>
				<NavLink to='/' className='font-bold text-slate-500 hover:text-slate-700 duration-200 ease-in-out'>
					PrintIT
				</NavLink>
			</Navbar.Brand>

			{user.id ? (
				<>
					{/* Desktop navigation */}
					<div className='hidden md:flex flex-grow items-center justify-between'>
						<Nav className='flex-grow flex justify-center'>
							<Nav.Item as='div' className='hover:!bg-transparent'>
								<SearchBar />
							</Nav.Item>
						</Nav>
						<Nav pullRight className='flex items-center'>
							<Nav.Item as={NavLink} className='py-0 mx-2' to='/discover'>
								Discover
							</Nav.Item>
							<Nav.Item as={NavLink} className='py-0 mx-2' to='/forum'>
								Forum
							</Nav.Item>
							<Nav.Item as={NavLink} to='/upload'>
								<Button appearance='primary'>Upload</Button>
							</Nav.Item>
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
					</div>

					{/* Mobile navigation */}
					<button className='block md:hidden text-gray-700' onClick={() => setMenuOpen(!menuOpen)} aria-label='Toggle menu'>
						☰
					</button>
					{menuOpen && (
						<div className='w-full md:hidden flex flex-col items-center bg-gray-100'>
							<Nav className='flex flex-col items-center py-2'>
								<Nav.Item as={NavLink} to='/discover' onClick={() => setMenuOpen(false)}>
									Discover
								</Nav.Item>
								<Nav.Item as={NavLink} to='/forum' onClick={() => setMenuOpen(false)}>
									Forum
								</Nav.Item>
								<Nav.Item as={NavLink} to='/upload' onClick={() => setMenuOpen(false)}>
									Upload
								</Nav.Item>
								<Nav.Item as={NavLink} to={`profile/${user.id}`} onClick={() => setMenuOpen(false)}>
									Profile
								</Nav.Item>
								{isAdmin && (
									<Nav.Item as={NavLink} to='/admin' onClick={() => setMenuOpen(false)}>
										Admin
									</Nav.Item>
								)}
								<Nav.Item onClick={handleLogout}>Logout</Nav.Item>
							</Nav>
						</div>
					)}
				</>
			) : (
				<div className='flex items-center'>
					<Nav pullRight className='hidden md:flex'>
						<Nav.Item as={NavLink} to='/register' className='py-0 mx-2'>
							Sign up
						</Nav.Item>
						<Nav.Item as={NavLink} to='/login' className='py-0 mx-2'>
							Sign in
						</Nav.Item>
					</Nav>
					{/* Mobile Auth Navigation */}
					<button className='block md:hidden text-gray-700' onClick={() => setMenuOpen(!menuOpen)} aria-label='Toggle menu'>
						☰
					</button>
					{menuOpen && (
						<div className='w-full md:hidden flex flex-col items-center bg-gray-100'>
							<Nav className='flex flex-col items-center py-2'>
								<Nav.Item as={NavLink} to='/register' onClick={() => setMenuOpen(false)}>
									Sign up
								</Nav.Item>
								<Nav.Item as={NavLink} to='/login' onClick={() => setMenuOpen(false)}>
									Sign in
								</Nav.Item>
							</Nav>
						</div>
					)}
				</div>
			)}
		</Navbar>
	);
};

export default Header;
