import L from 'leaflet';
import React, { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { getReverseData } from '../../lib/api/getFromHereAPI';
import { RouteContext } from '../../lib/context/RouteProvider';
import { areEqual } from '../../lib/helpers/areEqual';
import '../../styles/map.css';
import DisplayPosition from './DisplayPosition';
import Location from './Location';
import RoutingMachine from './RoutingMachine';

const getNewAddress = async (position: number[]) => {
	const newData = await getReverseData(position);
	return newData[0].address.label;
};

function MapControl(): JSX.Element {
	const { state, setRouteDetails, setLoading, setRoute } =
		useContext(RouteContext);
	const rMachine = useRef<L.Routing.Control>();
	const currentWaypoints = state.route.waypoints;

	const handleCalculateRoute = async (e: L.Routing.RoutingResultEvent) => {
		const currentStartPos = currentWaypoints.startingPoint.position;
		const currentEndPos = currentWaypoints.endingPoint.position;
		const updatedStarPos = [
			e.waypoints[0].latLng.lat,
			e.waypoints[0].latLng.lng
		];
		const updatedEndPos = [
			e.waypoints[1].latLng.lat,
			e.waypoints[1].latLng.lng
		];

		const areStartEqual = areEqual(currentStartPos, updatedStarPos);
		const areEndEqual = areEqual(currentEndPos, updatedEndPos);

		if (!areStartEqual || !areEndEqual) {
			setLoading(true);
			const updatedStartName = !areStartEqual
				? await getNewAddress(updatedStarPos)
				: currentWaypoints.startingPoint.name;

			const updatedEndName = !areEndEqual
				? await getNewAddress(updatedEndPos)
				: currentWaypoints.endingPoint.name;

			const waypoints = {
				startingPoint: {
					name: updatedStartName,
					position: updatedStarPos
				},
				endingPoint: {
					name: updatedEndName,
					position: updatedEndPos
				}
			};

			return setRoute(waypoints);
		}

		const routeDistance = e.routes[0].summary!.totalDistance;
		const routeDuration = e.routes[0].summary!.totalTime;

		const routeDetails = {
			distance: routeDistance,
			duration: routeDuration
		};

		setRouteDetails(routeDetails);
		setLoading(false);
	};

	useEffect(() => {
		if (rMachine.current) {
			rMachine.current.on('routesfound', (e: L.Routing.RoutingResultEvent) => {
				handleCalculateRoute(e);
			});
		}
	}, [currentWaypoints]);

	return (
		<MapContainer
			center={[51.509865, -0.118092]}
			zoom={13}
			zoomControl={false}
			scrollWheelZoom={true}>
			<TileLayer
				attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url={import.meta.env.VITE_MAP_TILES}
				minZoom={0}
				maxZoom={22}
				// subdomains="abcd"
				// accessToken="PyTJUlEU1OPJwCJlW1k0NC8JIt2CALpyuj7uc066O7XbdZCjWEL3WYJIk6dnXtps"
			/>
			<DisplayPosition />
			<RoutingMachine
				ref={rMachine as React.Ref<L.Routing.Control> | undefined}
				key={
					[
						currentWaypoints.startingPoint.position,
						currentWaypoints.endingPoint.position
					] as any
				}
				waypoints={[
					currentWaypoints.startingPoint.position,
					currentWaypoints.endingPoint.position
				]}
			/>
			<Location />
		</MapContainer>
	);
}

export default MapControl;
