import { Outlet } from 'react-router-dom';
import AppContext from '../../lib/context/AppContext';

function RootLayout() {
	return (
		<AppContext>
			<Outlet />
		</AppContext>
	);
}

export default RootLayout;
