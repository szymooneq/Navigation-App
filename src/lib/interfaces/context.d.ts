export interface IAppContext {
	searchParams: URLSearchParams;
	state: ReducerState;
	handleSetRoute: (routeInfo: IRoute) => void;
	handleSetPosition: (positionInfo: IPosition) => void;
}

export interface ReducerState {
	position: IPosition;
	route: IRoute;
	lastRoutes: IRoute[];
}

export interface IPosition {
	lat: number;
	lng: number;
	zoom: number;
}

export interface IRoute {
	waypoints: {
		start: IWaypoint;
		end: IWaypoint;
	};
	distance: number;
	duration: number;
}

export type ReducerAction =
	| {
			type: 'setRoute';
			payload: IRoute;
	  }
	| {
			type: 'setPosition';
			payload: IPosition;
	  };
/* | {
			type: 'setRouteWaypointNames';
			payload: string[];
	  }; */

interface IWaypoint {
	latlng: number[];
	title: string;
}
