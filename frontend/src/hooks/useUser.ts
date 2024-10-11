import { selectUser } from '@/store/auth/authSelector';
import { useAppSelector } from '@/store/hooks';

const useUser = () => {
	const user = useAppSelector(selectUser);
	const isAdmin = user.role?.name === 'Admin';

	return {
		user,
		isAdmin,
	};
};

export default useUser;
