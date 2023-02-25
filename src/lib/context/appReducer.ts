import { ReducerAction, ReducerState } from '../interfaces/context';

export const appReducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case 'setRoute': {
			const route = action.payload;
			const lastRoutes = [...state.lastRoutes];
			if (!lastRoutes.includes(route)) lastRoutes.unshift(route);
			if (lastRoutes.length > 5) lastRoutes.pop();

			return { ...state, route: { ...route }, lastRoutes };
		}
		case 'setPosition': {
			return { ...state, position: { ...action.payload } };
		}
		/* case 'setRouteWaypointNames': {
			return {
				...state,
				route: {
					waypoints: {
						start: { title: action.payload[0] },
						end: { title: action.payload[1] }
					}
				}
			};
		} */
		default:
			return { ...state };
	}
};
