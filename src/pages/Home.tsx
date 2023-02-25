import L, { LatLngExpression } from 'leaflet';
import 'leaflet-routing-machine';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import LastRouteCard from '../components/LastRouteCard';
import Logo from '../components/Logo';
import { Context } from '../lib/context/AppContext';
import '../styles/home.css';

const routingControl = L.Routing.control({
	lineOptions: {
		styles: [{ color: '#14b8a6', weight: 5 }],
		extendToWaypoints: false,
		missingRouteTolerance: 0
	},
	altLineOptions: {
		styles: [{ color: '#14b8a530', weight: 5 }],
		extendToWaypoints: false,
		missingRouteTolerance: 0
	},
	show: false,
	addWaypoints: false,
	routeWhileDragging: true,
	fitSelectedRoutes: true,
	showAlternatives: true
});

function Home() {
	let [searchParams, setSearchParams] = useSearchParams();
	const { state, handleSetRoute } = useContext(Context);
	const [homePage, setHomePage] = useState(false);
	const [expandNav, setExpandNav] = useState(false);
	const { pathname } = useLocation();

	const handleExpandNavbar = () => {
		setExpandNav((prev) => !prev);
	};

	const handleSetParams = (start: number[], end: number[]) => {
		searchParams.set('start', `${start[0].toFixed(4)},${start[1].toFixed(4)}`);
		searchParams.set('end', `${end[0].toFixed(4)},${end[1].toFixed(4)}`);
		setSearchParams(searchParams);
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
							<div className="mb-4">
								<label htmlFor="startingPoint">Start</label>
								<input
									className="block w-full p-2 rounded-md font-normal bg-black text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
									type="text"
									name="startingPoint"
									id="startingPoint"
									placeholder="E.g. 123 Main Street, Anytown, USA"
								/>
							</div>
							<div>
								<label htmlFor="endingPoint">End</label>
								<input
									className="block w-full p-2 rounded-md font-normal bg-black text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
									type="text"
									name="endingPoint"
									id="endingPoint"
									placeholder="E.g. 456 High Street, Cityville, Canada"
								/>
							</div>
						</div>
					</div>

					<div>
						<h1 className="text-3xl font-bold text-white">Last routes:</h1>
						{state.lastRoutes.map((route, index) => {
							return (
								<div
									key={index}
									onClick={() => {
										handleSetRoute(route);
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
