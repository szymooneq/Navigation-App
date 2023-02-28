import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import FormControl from '../components/Form/FormControl';
import LastRouteCard from '../components/LastRouteCard';
import Logo from '../components/Logo';
import { Context } from '../lib/context/AppContext';
import { convertStringToWaypoint } from '../lib/helpers/loadFromURL';
import '../styles/home.css';

function Home() {
	const { state, handleSetRouteWaypoints } = useContext(Context);
	const [homePage, setHomePage] = useState(false);
	const [expandNav, setExpandNav] = useState(false);
	const [input, setInput] = useState({
		startingPoint: '',
		endingPoint: ''
	});
	const { pathname, search } = useLocation();
	const navigate = useNavigate();

	/* const handleExpandNavbar = () => {
		setExpandNav((prev) => !prev);
	};
 */
	console.log(search);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const startingPoint = convertStringToWaypoint(input.startingPoint);
		const endingPoint = convertStringToWaypoint(input.endingPoint);
		if (startingPoint && endingPoint) {
			handleSetRouteWaypoints([startingPoint, endingPoint]);
		}
	};

	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
							<form onSubmit={handleSearch}>
								<FormControl
									id="startingPoint"
									label="Start"
									placeholder="E.g. 123 Main Street, Anytown, USA"
									value={input.startingPoint}
									onChange={handleChangeValue}
								/>
								<FormControl
									id="endingPoint"
									label="End"
									placeholder="E.g. 456 High Street, Cityville, Canada"
									value={input.endingPoint}
									onChange={handleChangeValue}
								/>
								<button
									type="submit"
									className="block w-full p-2 rounded-md font-semibold bg-[#14b8a6] text-black">
									Search
								</button>
							</form>
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
