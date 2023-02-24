import { ReducerAction, ReducerState } from '../interfaces/context';

export const appReducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case 'setRoute':
			console.log(action.payload);
			return { ...state, ...action.payload };
		/* case 'login':
			window.localStorage.setItem('token-data', JSON.stringify(action.payload));
			return { ...state, user: action.payload };
		case 'logout':
			window.localStorage.removeItem('token-data');
			return { ...state, user: null }; */
		default:
			return { ...state };
	}
};
