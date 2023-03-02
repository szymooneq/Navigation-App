export interface IAppContext {
	searchParams: URLSearchParams;
	state: ReducerState;
	handleSetRoute: (waypoints: number[][], details?: IRouteDetails) => void;
	handleSetRouteDetails: (details: IRouteDetails) => void;
	handleSetLoading: (value: boolean) => void;
	handleAddToLastRoutes: (
		waypoints: number[][],
		details: IRouteDetails
	) => void;
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
	position: number[][];
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
