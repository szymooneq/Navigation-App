import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useParams, useSearchParams } from 'react-router-dom';
import DisplayPosition from './DisplayPosition';
import Location from './Location';
import Routing from './Routing';
import RoutingMachine from './RoutingMachine';

const DEFAULT_POSITION = [49.56364, 20.63496, 13];

const loadLocation = (params: URLSearchParams) => {
	const lat = params.get('lat');
	const lng = params.get('lng');
	const zoom = params.get('zoom');

	if (lat && lng && zoom && !isNaN(+lat) && !isNaN(+lng) && !isNaN(+zoom))
		return [+lat, +lng, +zoom];

	return DEFAULT_POSITION;
};

function Map() {
	const { coordinates } = useParams();
	let [searchParams, setSearchParams] = useSearchParams();
	const [position, setPosition] = useState(() => loadLocation(searchParams));

	useEffect(() => {
		// console.log(window.location.pathname);
		// setSearchParams('cordy=50');
		// console.log(searchParams.get('@'));
	}, []);

	return (
		<MapContainer
			center={[+position[0], +position[1]]}
			zoom={+position[2]}
			zoomControl={false}
			scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* <Marker position={DEFAULT_POSITION as LatLngExpression}>
				<Popup>To jest moje miasto!</Popup>
			</Marker> */}
			<DisplayPosition />
			<Routing />
			{/* <RoutingMachine /> */}
			{/* <Location /> */}
		</MapContainer>
	);
}

export default Map;
