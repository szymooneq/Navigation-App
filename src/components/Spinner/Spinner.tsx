import { useContext } from 'react';
import { Context } from '../../lib/context/AppContext';
import './spinner.css';

function Spinner() {
	const { state } = useContext(Context);

	return state.isLoading ? (
		<div className="flex items-center justify-center w-screen h-screen fixed bg-[#00000075] z-[9999999]">
			<div className="lds-ring">
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	) : null;
}

export default Spinner;
