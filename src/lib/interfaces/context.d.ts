export interface IAppContext {
	state: ReducerState;
	handleSetRoute: (routeInfo: ReducerState) => void;
}

export interface ReducerState {
	start: string;
	end: string;
	distance: number;
	duration: number;
}

export type ReducerAction = {
	type: 'setRoute';
	payload: ReducerState;
};
