import { Outlet } from 'react-router-dom';
import AppContext from '../../lib/context/AppContext';
import Spinner from '../Spinner/Spinner';

function RootLayout() {
	return (
		<AppContext>
			<Spinner />
			<Outlet />
		</AppContext>
	);
}

export default RootLayout;
