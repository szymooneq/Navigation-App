export interface IAppContext {
	state: ReducerState;
	setRoute: (waypoints: IRouteWaypoints) => void;
	setRouteDetails: (details: IRouteDetails) => void;
	setLoading: (value: boolean) => void;
}

export interface ReducerState {
	route: IRoute;
	lastRoutes: IRoute[];
	isLoading: boolean;
}

export interface IRoute {
	waypoints: IRouteWaypoints;
	details: IRouteDetails;
}

export interface IRouteWaypoints {
	startingPoint: IRouteWaypoint;
	endingPoint: IRouteWaypoint;
}

interface IRouteWaypoint {
	name: string;
	position: number[];
}

export interface IRouteDetails {
	distance: number;
	duration: number;
}

export type ReducerAction =
	| {
			type: 'setRoute';
			payload: IRouteWaypoints;
	  }
	| {
			type: 'setRouteDetails';
			payload: IRouteDetails;
	  }
	| {
			type: 'setLoading';
			payload: boolean;
	  }
	| {
			type: 'addToLastRoutes';
			payload: IRoute;
	  };
