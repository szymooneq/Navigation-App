import L, { LatLngExpression } from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { getRouteData } from '../../lib/api/getRouteData';
import { Context } from '../../lib/context/AppContext';
import { debounce } from '../../lib/helpers/debounce';

function Routing() {
	const map = useMap();
	const { state, handleSetRoute, searchParams } = useContext(Context);

	const waypoints = [
		L.latLng(state.route.waypoints.start.latlng as LatLngExpression),
		L.latLng(state.route.waypoints.end.latlng as LatLngExpression)
	];

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

	const formatter = new L.Routing.Formatter({
		language: 'pl',
		distanceTemplate: '{value} {unit}'
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
		showAlternatives: true,
		plan: plan,
		formatter: formatter
	});

	const handleUpdateRoute = debounce(
		async (e: L.Routing.RoutingResultEvent) => {
			if (state.lastRoutes.includes(state.route)) return;
			const startingPoint = [
				e.waypoints[0].latLng.lat,
				e.waypoints[0].latLng.lng
			];
			const endingPoint = [
				e.waypoints[1].latLng.lat,
				e.waypoints[1].latLng.lng
			];

			const startingPointTitle = await getRouteData(startingPoint);
			const endingPointTitle = await getRouteData(endingPoint);

			const routeDistance = e.routes[0].summary!.totalDistance;
			const routeDuration = e.routes[0].summary!.totalTime;

			const route = {
				waypoints: {
					start: {
						latlng: startingPoint,
						title: startingPointTitle
					},
					end: {
						latlng: endingPoint,
						title: endingPointTitle
					}
				},
				distance: routeDistance,
				duration: routeDuration
			};

			handleSetRoute(route);
		},
		500
	);

	useEffect(() => {
		if (!map) return;
		console.log(map);
		routingControl.addTo(map);

		routingControl.on('routesfound', (e: L.Routing.RoutingResultEvent) => {
			handleUpdateRoute(e);
		});

		return () => {
			map.removeControl(routingControl);
		};
	}, [map]);

	return null;
}

export default Routing;
