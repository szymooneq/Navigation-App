import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Form from '../components/Form/Form';
import LastRouteCard from '../components/LastRouteCard';
import Logo from '../components/Logo';
import CloseIcon from '../components/UI/CloseIcon';
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

	const handleHideNavbar = useCallback(() => setExpandNav(false), [expandNav]);

	const handleChangeRoute = useCallback(
		(route: IRoute) => {
			handleHideNavbar();
			if (areEqual(route.waypoints, state.route.waypoints) && pathname !== '/')
				return;

			setLoading(true);
			setRoute(route.waypoints);
		},
		[state.route, pathname]
	);

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
				<CloseIcon onClick={handleHideNavbar} />
				<div className="container p-4 font-semibold tracking-tight text-gray-100">
					<Logo />
					<div className="mb-5">
						<h1 className="text-3xl font-bold text-white">New route:</h1>
						<Form hideNavbar={handleHideNavbar} />
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
