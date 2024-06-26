import { NavLink } from 'react-router-dom';

const Copyright = () => {
    return (
        <div className='my-3'>
            <p className='text-gray-500 text-center'>
                Copyright ©{' '}
                <NavLink to='/' className='underline'>
                    PrintIT
                </NavLink>
                &nbsp;
                {new Date().getFullYear()}.
            </p>
        </div>
    );
};

export default Copyright;
