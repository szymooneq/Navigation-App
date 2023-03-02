import { createContext, useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRouteData } from '../api/getRouteData';
import { debounce } from '../helpers/debounce';
import { loadRouteWaypointsFromURL } from '../helpers/loadFromURL';
import {
	IAppContext,
	IRoute,
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
			if (JSON.stringify(waypoints) === JSON.stringify(state.route.waypoints))
				return handleSetLoading(false);

			const startingPosition = waypoints.startingPoint.position;
			const endingPosition = waypoints.endingPoint.position;

			searchParams.set(
				'start',
				`${startingPosition[0]},${startingPosition[1]}`
			);
			searchParams.set('end', `${endingPosition[0]},${endingPosition[1]}`);

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
		handleAddToLastRoutes(state.route.waypoints, details);
	};

	const handleAddToLastRoutes = (
		waypoints: IRouteWaypoints,
		details: IRouteDetails
	) => {
		let isContain = false;

		const newRoute = {
			waypoints,
			details
		};

		state.lastRoutes.map((value) => {
			if (JSON.stringify(value) === JSON.stringify(newRoute)) isContain = true;
		});

		if (!isContain) {
			dispatch({ type: 'addToLastRoutes', payload: newRoute });
		}
	};

	const handleSetLoading = (value: boolean) => {
		dispatch({ type: 'setLoading', payload: value });
	};

	const getDataFromURL = async () => {
		const waypointsFromURL = loadRouteWaypointsFromURL(searchParams);

		if (waypointsFromURL.length) {
			handleSetLoading(true);
			const startingPointName = await getRouteData(waypointsFromURL[0]);
			const endingPointName = await getRouteData(waypointsFromURL[1]);

			const waypoints = {
				startingPoint: {
					name: startingPointName.address.label,
					position: waypointsFromURL[0]
				},
				endingPoint: {
					name: endingPointName.address.label,
					position: waypointsFromURL[1]
				}
			};

			handleSetRoute(waypoints);
		}
	};

	useEffect(() => {
		getDataFromURL();
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
