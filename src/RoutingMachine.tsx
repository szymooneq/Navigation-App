import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const createRoutineMachineLayer = () => {
	const instance = L.Routing.control({
		waypoints: [L.latLng(49.61718, 20.71339), L.latLng(49.5919, 20.6661)],
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

	return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
