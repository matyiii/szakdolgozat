import Copyright from '../Copyright/Copyright';

const Footer = () => {
	return (
		<footer>
			<div className='flex flex-col justify-center items-center text-gray-500 bg-yellow-50 border-t border-t-slate-200 pt-2'>
				<div>
					<a href='/docs/privacy_policy.pdf' target='_blank' rel='noopener noreferrer'>
						Privacy Policy
					</a>
				</div>
				<Copyright />
			</div>
		</footer>
	);
};

export default Footer;
