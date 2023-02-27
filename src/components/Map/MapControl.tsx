import L from 'leaflet';
import React, { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { getRouteData } from '../../lib/api/getRouteData';
import { Context } from '../../lib/context/AppContext';
import { debounce } from '../../lib/helpers/debounce';
import { IRoute } from '../../lib/interfaces/context';
import '../../styles/map.css';
import DisplayPosition from './DisplayPosition';
import Location from './Location';
import RoutingMachine from './RoutingMachine';

const compareArrays = (array: IRoute[], nestedArray: IRoute) => {
	let isContained = false;

	array.map((x) => {
		if (JSON.stringify(nestedArray.waypoints) === JSON.stringify(x.waypoints))
			isContained = true;
	});

	return isContained;
};

function MapControl() {
	const {
		state,
		handleSetRouteDetails,
		handleSetLoading,
		handleAddToLastRoutes
	} = useContext(Context);
	const rMachine = useRef<L.Routing.Control>();

	const handleGetRouteDetails = debounce(
		async (e: L.Routing.RoutingResultEvent) => {
			if (compareArrays(state.lastRoutes, state.route)) {
				handleSetLoading(false);
				return;
			}

			const startPointCoords = [
				e.waypoints[0].latLng.lat,
				e.waypoints[0].latLng.lng
			];
			const endPointCoords = [
				e.waypoints[1].latLng.lat,
				e.waypoints[1].latLng.lng
			];

			const startPointTitle = await getRouteData(startPointCoords);
			const endPointTitle = await getRouteData(endPointCoords);

			const routeDistance = e.routes[0].summary!.totalDistance;
			const routeDuration = e.routes[0].summary!.totalTime;

			const updatedDetails = {
				start: startPointTitle,
				end: endPointTitle,
				distance: routeDistance,
				duration: routeDuration
			};

			handleAddToLastRoutes([startPointCoords, endPointCoords], updatedDetails);
			handleSetRouteDetails(updatedDetails);
		},
		500
	);

	useEffect(() => {
		if (rMachine.current) {
			rMachine.current.on('routesfound', (e: L.Routing.RoutingResultEvent) => {
				handleGetRouteDetails(e);
			});
		}
	}, [state.route.waypoints]);

	return (
		<MapContainer
			center={[51.509865, -0.118092]}
			zoom={13}
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
			<DisplayPosition />
			<RoutingMachine
				ref={rMachine as React.Ref<L.Routing.Control> | undefined}
				key={state.route.waypoints as any}
				waypoints={state.route.waypoints}
			/>
			<Location />
		</MapContainer>
	);
}

export default MapControl;
