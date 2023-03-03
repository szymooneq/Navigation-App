import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Form from '../components/Form/Form';
import LastRouteCard from '../components/LastRouteCard';
import Logo from '../components/Logo';
import { RouteContext } from '../lib/context/RouteProvider';
import { areEqual } from '../lib/helpers/areEqual';
import { IRoute } from '../lib/interfaces/context';
import '../styles/home.css';

function Home() {
	const { state, setRoute, setLoading } = useContext(RouteContext);
	const [homePage, setHomePage] = useState(false);
	const [expandNav, setExpandNav] = useState(false);
	const { pathname } = useLocation();

	const handleChangeRoute = (route: IRoute) => {
		if (areEqual(route.waypoints, state.route.waypoints) && pathname !== '/')
			return;

		setLoading(true);
		setRoute(route.waypoints);
	};

	useEffect(() => {
		if (expandNav) document.documentElement.style.position = 'fixed';
	}, [expandNav]);

	useEffect(() => {
		setHomePage(pathname === '/' ? true : false);
	}, [pathname]);

	return (
		<div className="home-page">
			<div
				className="navbar bg-black text-white md:flex-1"
				data-expand={expandNav}
				data-home={homePage}>
				<div className="container p-4 font-semibold tracking-tight text-gray-100">
					<Logo />
					<div className="mb-5">
						<h1 className="text-3xl font-bold text-white">New route:</h1>
						<div className="p-3 bg-zinc-900 rounded-lg">
							<Form />
						</div>
					</div>
					<div>
						<h1 className="text-3xl font-bold text-white">Last routes:</h1>
						{state.lastRoutes.map((route, index) => {
							return (
								<div key={index} onClick={() => handleChangeRoute(route)}>
									<LastRouteCard route={route} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<Outlet />
		</div>
	);
}

export default Home;
