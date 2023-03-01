import { useContext, useState } from 'react';
import { forwardGeocoder } from '../../lib/api/getRouteData';
import { Context } from '../../lib/context/AppContext';
import FormControl from './FormControl';

function Form() {
	const { state, handleSetLoading, handleSetRouteWaypoints } =
		useContext(Context);
	const [values, setValues] = useState({
		startingPoint: '',
		endingPoint: ''
	});

	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSetValueFromSuggestion = (
		id: 'startingPoint' | 'endingPoint',
		suggestion: string
	) => {
		setValues((prev) => ({ ...prev, [id]: suggestion }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!values.startingPoint ||
			values.startingPoint === state.route.details.start ||
			!values.endingPoint ||
			values.endingPoint === state.route.details.end
		)
			return;

		handleSetLoading(true);
		const startingPoint = await forwardGeocoder(values.startingPoint);
		const endingPoint = await forwardGeocoder(values.endingPoint);

		if (startingPoint && endingPoint) {
			return handleSetRouteWaypoints([
				[startingPoint.lat, startingPoint.lng],
				[endingPoint.lat, endingPoint.lng]
			]);
		}

		return handleSetLoading(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl
				id="startingPoint"
				label="Start"
				placeholder="E.g. 123 Main Street, Anytown, USA"
				value={values.startingPoint}
				onChange={handleChangeValue}
				handleSetValueFromSuggestion={handleSetValueFromSuggestion}
			/>
			<FormControl
				id="endingPoint"
				label="End"
				placeholder="E.g. 456 High Street, Cityville, Canada"
				value={values.endingPoint}
				onChange={handleChangeValue}
				handleSetValueFromSuggestion={handleSetValueFromSuggestion}
			/>
			<button
				type="submit"
				className="block w-full p-2 rounded-md font-semibold bg-[#14b8a6] text-black">
				Search
			</button>
		</form>
	);
}

export default Form;
