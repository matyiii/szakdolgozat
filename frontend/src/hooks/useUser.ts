import { selectUser } from '@/store/auth/authSelector';
import { useAppSelector } from '@/store/hooks';

const useUser = () => {
	const user = useAppSelector(selectUser);

	return {
		user,
	};
};

export default useUser;
