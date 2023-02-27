export interface IAppContext {
	searchParams: URLSearchParams;
	state: ReducerState;
	handleSetRouteWaypoints: (
		waypoints: number[][],
		details?: IRouteDetails
	) => void;
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
	waypoints: number[][];
	details: IRouteDetails;
}

export interface IRouteDetails {
	start: string;
	end: string;
	distance: number;
	duration: number;
}

export type ReducerAction =
	| {
			type: 'setRouteWaypoints';
			payload: {
				start: number[];
				end: number[];
			};
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

interface IWaypoint {
	latlng: number[];
	title: string;
}
