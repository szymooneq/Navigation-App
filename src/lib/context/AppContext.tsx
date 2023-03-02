import { createContext, useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from '../helpers/debounce';
import { loadRouteWaypointsFromURL } from '../helpers/loadFromURL';
import {
	IAppContext,
	IRouteDetails,
	IRouteWaypoints
} from '../interfaces/context';
import { appReducer } from './appReducer';

export const Context = createContext({} as IAppContext);

interface props {
	children: React.ReactNode;
}

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

function AppContext({ children }: props): JSX.Element {
	let [searchParams, setSearchParams] = useSearchParams();
	const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

	const handleSetRoute = debounce(
		(waypoints: IRouteWaypoints, details?: IRouteDetails) => {
			// if (JSON.stringify(waypoints) === JSON.stringify(state.route.waypoints)) return handleSetLoading(false);

			handleSetLoading(true);

			if (details) handleSetRouteDetails(details);

			const startingPoint = waypoints.startingPoint;
			const endingPoint = waypoints.endingPoint;

			searchParams.set(
				'start',
				`${startingPoint.position[0]},${startingPoint.position[1]}`
			);
			searchParams.set(
				'end',
				`${endingPoint.position[0]},${endingPoint.position[1]}`
			);

			setSearchParams(searchParams);

			dispatch({
				type: 'setRoute',
				payload: waypoints
			});
		},
		500
	);

	const handleSetRouteDetails = (details: IRouteDetails) => {
		dispatch({ type: 'setRouteDetails', payload: details });
		handleSetLoading(false);
	};

	const handleAddToLastRoutes = (
		waypoints: number[][],
		details: IRouteDetails
	) => {
		const newLastRoute = {
			waypoints: waypoints,
			details: details
		};
		dispatch({ type: 'addToLastRoutes', payload: newLastRoute });
	};

	const handleSetLoading = (value: boolean) => {
		dispatch({ type: 'setLoading', payload: value });
	};

	const fetchData = () => {
		const waypointsFromURL = loadRouteWaypointsFromURL(searchParams);
		if (waypointsFromURL.length) handleSetRoute(waypointsFromURL);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Context.Provider
			value={{
				state,
				searchParams,
				handleSetRoute,
				handleSetRouteDetails,
				handleSetLoading,
				handleAddToLastRoutes
			}}>
			{children}
		</Context.Provider>
	);
}

export default AppContext;
