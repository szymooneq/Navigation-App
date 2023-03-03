import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = (props: any) => {
	const { waypoints } = props;

	const plan = L.Routing.plan(waypoints, {
		createMarker: function (i: number, waypoint: any, n: number) {
			const startIcon = L.icon({
				iconUrl:
					'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowUrl:
					'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
				shadowSize: [41, 41]
			});

			const endIcon = L.icon({
				iconUrl:
					'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-black.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowUrl:
					'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
				shadowSize: [41, 41]
			});

			let marker_icon;
			if (i === 0) marker_icon = startIcon;
			if (i === n - 1) marker_icon = endIcon;

			const marker = L.marker(waypoint.latLng, {
				draggable: true,
				icon: marker_icon
			});

			return marker;
		}
	});

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
		showAlternatives: false,
		plan: plan
	});

	return routingControl;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
