import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Form from '../components/Form/Form';
import LastRouteCard from '../components/LastRouteCard';
import Logo from '../components/Logo';
import { Context } from '../lib/context/AppContext';
import '../styles/home.css';

function Home() {
	const { state, handleSetRouteWaypoints } = useContext(Context);
	const [homePage, setHomePage] = useState(false);
	const [expandNav, setExpandNav] = useState(false);

	const { pathname } = useLocation();
	const navigate = useNavigate();

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
								<div
									key={index}
									onClick={() => {
										if (pathname === '/') {
											navigate({
												pathname: '/map',
												search: `?start=${route.waypoints[0][0]},${route.waypoints[0][1]}&end=${route.waypoints[1][0]},${route.waypoints[1][1]}`
											});
											return;
										}
										handleSetRouteWaypoints(route.waypoints, route.details);
									}}>
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
