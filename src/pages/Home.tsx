import { ChevronDoubleRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Form from '../components/Form/Form';
import LastRouteCard from '../components/LastRouteCard';
import Logo from '../components/Logo';
import { RouteContext } from '../lib/context/RouteProvider';
import { areEqual } from '../lib/helpers/areEqual';
import { IRoute } from '../lib/interfaces/context';
import '../styles/home.css';

const handleDisableScroll = (isTrue: boolean) => {
	if (isTrue) return (document.documentElement.style.position = 'fixed');
	return (document.documentElement.style.position = '');
};

function Home() {
	const { state, setRoute, setLoading } = useContext(RouteContext);
	const [homePage, setHomePage] = useState(false);
	const [expandNav, setExpandNav] = useState(false);
	const { pathname } = useLocation();

	const handleHideNavbar = () => setExpandNav(false);

	const handleChangeRoute = (route: IRoute) => {
		handleHideNavbar();
		if (areEqual(route.waypoints, state.route.waypoints) && pathname !== '/')
			return;

		setLoading(true);
		setRoute(route.waypoints);
	};

	useEffect(() => {
		handleDisableScroll(expandNav);
	}, [expandNav]);

	useEffect(() => {
		setHomePage(pathname === '/' ? true : false);
	}, [pathname]);

	return (
		<div className="home-page relative">
			<div
				className="navbar bg-black text-white md:flex-1"
				data-expand={expandNav}
				data-home={homePage}>
				<div className="close" onClick={() => setExpandNav(false)}>
					<XMarkIcon width={35} height={35} />
				</div>
				<div className="container p-4 font-semibold tracking-tight text-gray-100">
					<Logo />
					<div className="mb-5">
						<h1 className="text-3xl font-bold text-white">New route:</h1>
						<div className="p-3 bg-zinc-900 rounded-lg">
							<Form hideNavbar={handleHideNavbar} />
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
			<div className="burger" onClick={() => setExpandNav(true)}>
				<ChevronDoubleRightIcon width={40} height={40} />
			</div>
			<Outlet />
		</div>
	);
}

export default Home;
