import { ReducerAction, ReducerState } from '../interfaces/context';

export const appReducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case 'setRoute': {
			const newRoute = {
				...state.route,
				waypoints: action.payload
			};

			return { ...state, route: newRoute };
		}
		case 'setRouteDetails': {
			const routeDetails = action.payload;

			const routeWithNewDetails = {
				...state.route,
				details: routeDetails
			};

			return { ...state, route: routeWithNewDetails };
		}
		case 'setLoading': {
			return { ...state, isLoading: action.payload };
		}
		case 'addToLastRoutes': {
			const newRoute = action.payload;
			const newLastRoutes = [newRoute, ...state.lastRoutes];
			if (newLastRoutes.length > 5) newLastRoutes.pop();

			return { ...state, lastRoutes: newLastRoutes };
		}
		default:
			return { ...state };
	}
};
