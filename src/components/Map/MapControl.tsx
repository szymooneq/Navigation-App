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

const isEqual = (firstArray: number[], secondArray: number[]) => {
	return JSON.stringify(firstArray) === JSON.stringify(secondArray)
		? true
		: false;
};

function MapControl() {
	const {
		state,
		handleSetRouteDetails,
		handleSetLoading,
		handleSetRoute,
		handleAddToLastRoutes
	} = useContext(Context);
	const rMachine = useRef<L.Routing.Control>();

	const handleCalculateRoute = async (e: L.Routing.RoutingResultEvent) => {
		const currentStartingPosition =
			state.route.waypoints.startingPoint.position;
		const currentEndingPosition = state.route.waypoints.endingPoint.position;
		const updatedStartingPosition = [
			e.waypoints[0].latLng.lat,
			e.waypoints[0].latLng.lng
		];
		const updatedEndingPosition = [
			e.waypoints[1].latLng.lat,
			e.waypoints[1].latLng.lng
		];

		if (
			!isEqual(currentStartingPosition, updatedStartingPosition) ||
			!isEqual(currentEndingPosition, updatedEndingPosition)
		) {
			handleSetLoading(true);
			const newStartingPointName = await getRouteData(updatedStartingPosition);
			const newEndingPointName = await getRouteData(updatedEndingPosition);

			const waypoints = {
				startingPoint: {
					name: newStartingPointName.address.label,
					position: updatedStartingPosition
				},
				endingPoint: {
					name: newEndingPointName.address.label,
					position: updatedEndingPosition
				}
			};

			return handleSetRoute(waypoints);
		}

		const routeDistance = e.routes[0].summary!.totalDistance;
		const routeDuration = e.routes[0].summary!.totalTime;

		const routeDetails = {
			distance: routeDistance,
			duration: routeDuration
		};

		handleSetRouteDetails(routeDetails);
		handleSetLoading(false);
	};

	useEffect(() => {
		if (rMachine.current) {
			rMachine.current.on('routesfound', (e: L.Routing.RoutingResultEvent) => {
				handleCalculateRoute(e);
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
				key={
					[
						state.route.waypoints.startingPoint.position,
						state.route.waypoints.endingPoint.position
					] as any
				}
				waypoints={[
					state.route.waypoints.startingPoint.position,
					state.route.waypoints.endingPoint.position
				]}
			/>
			<Location />
		</MapContainer>
	);
}

export default MapControl;
