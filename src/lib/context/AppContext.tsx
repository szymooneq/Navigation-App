import { createContext, useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from '../helpers/debounce';
import { loadRouteWaypointsFromURL } from '../helpers/loadFromURL';
import { IAppContext, IRouteDetails } from '../interfaces/context';
import { appReducer } from './appReducer';

export const Context = createContext({} as IAppContext);

interface props {
	children: React.ReactNode;
}

const INITIAL_STATE = {
	route: {
		waypoints: [],
		details: {
			start: '',
			end: '',
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

	const handleSetRouteWaypoints = debounce(
		(waypoints: number[][], details?: IRouteDetails) => {
			if (JSON.stringify(waypoints) === JSON.stringify(state.route.waypoints))
				return;
			handleSetLoading(true);
			const startWaypoint = waypoints[0];
			const endWaypoint = waypoints[1];

			searchParams.set('start', `${startWaypoint[0]},${startWaypoint[1]}`);
			searchParams.set('end', `${endWaypoint[0]},${endWaypoint[1]}`);

			setSearchParams(searchParams);
			dispatch({
				type: 'setRouteWaypoints',
				payload: { start: startWaypoint, end: endWaypoint }
			});

			if (details) handleSetRouteDetails(details);
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
		if (waypointsFromURL.length) handleSetRouteWaypoints(waypointsFromURL);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Context.Provider
			value={{
				state,
				searchParams,
				handleSetRouteWaypoints,
				handleSetRouteDetails,
				handleSetLoading,
				handleAddToLastRoutes
			}}>
			{children}
		</Context.Provider>
	);
}

export default AppContext;
