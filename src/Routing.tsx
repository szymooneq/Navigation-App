import L from 'leaflet';
import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';

const wayPoints = [
	L.latLng([49.61718, 20.71339]),
	L.latLng([49.5919, 20.6661])
];

function Routing() {
	const map = useMap();
	let [searchParams, setSearchParams] = useSearchParams();

	const routingControl = L.Routing.control({
		// waypoints: wayPoints,
		lineOptions: {
			styles: [{ color: '#3e88f7', weight: 4 }],
			extendToWaypoints: false,
			missingRouteTolerance: 0
		},
		altLineOptions: {
			styles: [{ color: '#3333339e', weight: 4 }],
			extendToWaypoints: false,
			missingRouteTolerance: 0
		},
		show: false,
		addWaypoints: true,
		routeWhileDragging: true,
		fitSelectedRoutes: true,
		showAlternatives: true
	});

	useEffect(() => {
		if (!map) return;
		routingControl.addTo(map);

		routingControl.on('routesfound', function (e) {
			/* const distance = e.routes[0].summary.totalDistance;
			const time = e.routes[0].summary.totalTime; */
			console.log(e);
		});

		routingControl.setWaypoints(wayPoints);

		return () => {
			map.removeControl(routingControl);
		};
	}, [map]);

	return (
		<Marker position={[49.56364, 20.63496]}>
			<Popup>To jest moje miasto!</Popup>
		</Marker>
	);
}

export default Routing;
