import { Link, Typography } from '@mui/material';

const Copyright = () => {
	return (
		<Typography variant='body2' color='text.secondary' align='center' sx={{ mt: 8, mb: 4 }}>
			{'Copyright © '}
			<Link color='inherit' href='/'>
				Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

export default Copyright;
