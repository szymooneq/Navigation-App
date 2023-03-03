import { Outlet } from 'react-router-dom';
import RouteProvider from '../../lib/context/RouteProvider';

function RootLayout(): JSX.Element {
	return (
		<RouteProvider>
			<Outlet />
		</RouteProvider>
	);
}

export default RootLayout;
