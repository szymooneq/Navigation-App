import { createContext, useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRouteData } from '../api/getRouteData';
import { loadLocation, loadRoute } from '../helpers/loadFromURL';
import { IAppContext, IPosition, IRoute } from '../interfaces/context';
import { appReducer } from './appReducer';

export const Context = createContext({} as IAppContext);

interface props {
	children: React.ReactNode;
}

const INITIAL_FUNC = (params: URLSearchParams) => {
	const currentPosition = loadLocation(params);
	const currentRoute = loadRoute(params);

	return {
		position: currentPosition,
		route: {
			waypoints: currentRoute,
			distance: 0,
			duration: 0
		},
		lastRoutes: []
	};
};

function AppContext({ children }: props): JSX.Element {
	let [searchParams, setSearchParams] = useSearchParams();
	const [state, dispatch] = useReducer(appReducer, {}, () =>
		INITIAL_FUNC(searchParams)
	);

	const handleUpdateParams = (params: URLSearchParams) => {
		setSearchParams(params);
	};

	const handleSetRoute = (routeInfo: IRoute) => {
		dispatch({ type: 'setRoute', payload: routeInfo });

		const startPoint = routeInfo.waypoints.start.latlng;
		const endPoint = routeInfo.waypoints.end.latlng;

		searchParams.set(
			'start',
			`${startPoint[0].toFixed(4)},${startPoint[1].toFixed(4)}`
		);
		searchParams.set(
			'end',
			`${endPoint[0].toFixed(4)},${endPoint[1].toFixed(4)}`
		);
		setSearchParams(searchParams);
	};

	const handleSetPosition = (positionInfo: IPosition) => {
		dispatch({ type: 'setPosition', payload: positionInfo });

		searchParams.set('lat', positionInfo.lat.toString());
		searchParams.set('lng', positionInfo.lng.toString());
		searchParams.set('zoom', positionInfo.zoom.toString());
		setSearchParams(searchParams);
	};

	const handleSetRouteData = (waypointsNames: string[]) => {
		// dispatch({ type: 'setRouteWaypointNames', payload: waypointsNames });
	};

	/* useEffect(() => {
		const startData = getRouteData(state.route.waypoints.start.latlng);
		const endData = getRouteData(state.route.waypoints.end.latlng);
	}, [state.route]); */

	return (
		<Context.Provider
			value={{
				state,
				searchParams,
				handleSetRoute,
				handleSetPosition
			}}>
			{children}
		</Context.Provider>
	);
}

export default AppContext;
