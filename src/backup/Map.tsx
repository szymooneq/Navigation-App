import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import DisplayPosition from './components/Map/DisplayPosition';
import Location from './components/Map/Location';
import Routing from './components/Map/Routing';
import './styles/map.css';

const DEFAULT_POSITION = [49.56364, 20.63496, 13];

const loadLocation = (params: URLSearchParams) => {
	const lat = params.get('lat');
	const lng = params.get('lng');
	const zoom = params.get('zoom');

	if (lat && lng && zoom && !isNaN(+lat) && !isNaN(+lng) && !isNaN(+zoom))
		return [+lat, +lng, +zoom];

	return DEFAULT_POSITION;
};

const filterLocation = (stringCoordinates: string) => {
	const arrayWithCoordinates = stringCoordinates
		.split(',')
		.map((x) => +x)
		.filter((x) => (isNaN(x) ? null : x));

	if (arrayWithCoordinates.length === 2) return arrayWithCoordinates;
};

const loadRoute = (params: URLSearchParams) => {
	const startParams = params.get('start');
	const endParams = params.get('end');

	if (startParams && endParams) {
		const startingPoint = filterLocation(startParams);
		const endingPoint = filterLocation(endParams);

		if (startingPoint && endingPoint)
			return [[...startingPoint], [...endingPoint]];
	}

	return [];
};

function Map() {
	let [searchParams, setSearchParams] = useSearchParams();
	const [position, setPosition] = useState(() => loadLocation(searchParams));
	const [route, setRoute] = useState(() => loadRoute(searchParams));

	const updateSearchParams = (searchParams: URLSearchParams) => {
		setSearchParams(searchParams);
	};

	return (
		<>
			<MapContainer
				center={[+position[0], +position[1]]}
				zoom={+position[2]}
				zoomControl={false}
				scrollWheelZoom={true}>
				<TileLayer
					attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}"
					minZoom={0}
					maxZoom={22}
					subdomains="abcd"
					accessToken="PyTJUlEU1OPJwCJlW1k0NC8JIt2CALpyuj7uc066O7XbdZCjWEL3WYJIk6dnXtps"
				/>
				<DisplayPosition
					searchParams={searchParams}
					updateSearchParams={updateSearchParams}
				/>
				<Routing
					route={route}
					searchParams={searchParams}
					updateSearchParams={updateSearchParams}
				/>
				<Location />
			</MapContainer>
			{/* <div className="leaflet-container"></div> */}
			<div className="container p-4 font-semibold tracking-tight text-gray-100">
				<div className="mb-3 p-3 bg-zinc-900 rounded-lg">
					<h1 className="text-3xl font-bold text-white">Route:</h1>
					<p className="mt-2">Start: {searchParams.get('start')}</p>
					<p className="mt-2">End: {searchParams.get('end')}</p>
				</div>

				<div className="mb-3 p-3 bg-zinc-900 rounded-lg">
					<h1 className="text-3xl font-bold text-white">Price:</h1>
					<p className="mt-2">Km: </p>
					<p className="mt-2">Duration: </p>
					<div className="flex items-center gap-2">
						<label htmlFor="multiplier">Multiplier:</label>
						<input
							className="block w-full p-2 rounded-md bg-black text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
							type="number"
							name="multiplier"
							id="multiplier"
							step={1}
							placeholder="Enter multiplier"
						/>
					</div>
					<p>Total price: </p>
				</div>
				<h1 className="text-3xl font-bold text-white">Total:</h1>
			</div>
		</>
	);
}

export default Map;
