import { createContext, useReducer } from 'react';
import { IAppContext, ReducerState } from '../interfaces/context';
import { appReducer } from './appReducer';

export const Context = createContext({} as IAppContext);

interface props {
	children: React.ReactNode;
}

const INITIAL_STATE: ReducerState = {
	start: '',
	end: '',
	distance: 0,
	duration: 0
};

function AppContext({ children }: props): JSX.Element {
	const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

	const handleSetRoute = (routeInfo: ReducerState) => {
		dispatch({ type: 'setRoute', payload: routeInfo });
	};

	return (
		<Context.Provider value={{ state, handleSetRoute }}>
			{children}
		</Context.Provider>
	);
}

export default AppContext;
