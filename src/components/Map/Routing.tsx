import L, { LatLngExpression } from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useContext, useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';
import { Context } from '../../lib/context/AppContext';
import { debounce } from '../../lib/helpers/debounce';

/* const wayPoints = [
	L.latLng([49.61718, 20.71339]),
	L.latLng([49.5919, 20.6661])
]; */

interface props {
	route: number[][];
	searchParams: URLSearchParams;
	updateSearchParams: (searchParams: URLSearchParams) => void;
}

const loadWaypoints = (route: number[][]) => {
	if (route.length) {
		return route?.map((point) => L.latLng(point as LatLngExpression));
	}

	return [];
};

function Routing({ route, searchParams, updateSearchParams }: props) {
	const map = useMap();
	const [waypoints, setWaypoints] = useState(() => loadWaypoints(route));
	const { handleSetRoute } = useContext(Context);

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

	const handleUpdateSearchParams = debounce((e: any) => {
		const startLat: number = e.waypoints[0].latLng.lat;
		const startLng: number = e.waypoints[0].latLng.lng;
		const endLat: number = e.waypoints[1].latLng.lat;
		const endLng: number = e.waypoints[1].latLng.lng;

		const newDistance = e.routes[0].summary.totalDistance as number;
		const newDuration = e.routes[0].summary.totalTime as number;
		const newStartParams = `${startLat.toFixed(4)},${startLng.toFixed(4)}`;
		const newEndParams = `${endLat.toFixed(4)},${endLng.toFixed(4)}`;

		const route = {
			start: newStartParams,
			end: newEndParams,
			distance: newDistance,
			duration: newDuration
		};

		searchParams.set('start', newStartParams);
		searchParams.set('end', newEndParams);

		handleSetRoute(route);
		updateSearchParams(searchParams);
	}, 500);

	useEffect(() => {
		if (!map) return;
		routingControl.addTo(map);

		routingControl.on('routesfound', function (e) {
			handleUpdateSearchParams(e);
		});

		return () => {
			map.removeControl(routingControl);
		};
	}, [map]);

	return null;
}

export default Routing;
