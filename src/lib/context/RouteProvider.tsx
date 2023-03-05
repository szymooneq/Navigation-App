import { createContext, useCallback, useEffect, useReducer } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { getReverseData } from '../api/getFromHereAPI';
import { areEqual } from '../helpers/areEqual';
import { loadWaypointsFromURL } from '../helpers/loadFromURL';
import {
	IAppContext,
	IRouteDetails,
	IRouteWaypoints
} from '../interfaces/context';
import { routeReducer } from './routeReducer';

const INITIAL_STATE = {
	route: {
		waypoints: {
			startingPoint: {
				name: '',
				position: []
			},
			endingPoint: {
				name: '',
				position: []
			}
		},
		details: {
			distance: 0,
			duration: 0
		}
	},
	lastRoutes: [],
	isLoading: false
};

export const RouteContext = createContext({} as IAppContext);

interface props {
	children: React.ReactNode;
}

function RouteProvider({ children }: props): JSX.Element {
	const [state, dispatch] = useReducer(routeReducer, INITIAL_STATE);
	const [searchParams, setSearchParams] = useSearchParams();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const setRoute = (waypoints: IRouteWaypoints) => {
		const startingPosition = waypoints.startingPoint.position;
		const endingPosition = waypoints.endingPoint.position;
		handleUpdateURLParams(startingPosition, endingPosition);
		dispatch({
			type: 'setRoute',
			payload: waypoints
		});
	};

	const setRouteDetails = (details: IRouteDetails) => {
		dispatch({ type: 'setRouteDetails', payload: details });
		handleAddToLastRoutes(state.route.waypoints, details);
	};

	const setLoading = (value: boolean) => {
		dispatch({ type: 'setLoading', payload: value });
	};

	const handleAddToLastRoutes = (
		waypoints: IRouteWaypoints,
		details: IRouteDetails
	) => {
		const newRoute = {
			waypoints,
			details
		};

		const isFound = state.lastRoutes.some((route) => {
			if (areEqual(route, newRoute)) return true;
			return false;
		});

		if (!isFound) {
			dispatch({ type: 'addToLastRoutes', payload: newRoute });
		}
	};

	const handleUpdateURLParams = (startPos: number[], endPos: number[]) => {
		if (pathname === '/') {
			return navigate({
				pathname: '/map',
				search: `?start=${startPos[0]},${startPos[1]}&end=${endPos[0]},${endPos[1]}`
			});
		}
		searchParams.set('start', `${startPos[0]},${startPos[1]}`);
		searchParams.set('end', `${endPos[0]},${endPos[1]}`);
		setSearchParams(searchParams);
	};

	const getDataFromURL = useCallback(async () => {
		const waypointsFromURL = loadWaypointsFromURL(searchParams);

		if (waypointsFromURL.length) {
			setLoading(true);
			const startingPointName = await getReverseData(waypointsFromURL[0]);
			const endingPointName = await getReverseData(waypointsFromURL[1]);

			const newRoute = {
				startingPoint: {
					name: startingPointName[0].address.label,
					position: waypointsFromURL[0]
				},
				endingPoint: {
					name: endingPointName[0].address.label,
					position: waypointsFromURL[1]
				}
			};

			setRoute(newRoute);
		}
	}, []);

	useEffect(() => {
		getDataFromURL();
	}, []);

	return (
		<RouteContext.Provider
			value={{
				state,
				setRoute,
				setRouteDetails,
				setLoading
			}}>
			{state.isLoading && <Spinner />}
			{children}
		</RouteContext.Provider>
	);
}

export default RouteProvider;
