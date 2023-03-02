import { useContext, useState } from 'react';
import { forwardGeocoder } from '../../lib/api/getRouteData';
import { Context } from '../../lib/context/AppContext';
import FormControl from './FormControl';

function Form() {
	const { state, handleSetLoading, handleSetRoute } = useContext(Context);
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
		if (!values.startingPoint && !values.endingPoint) return;

		handleSetLoading(true);
		const startingPointData = await forwardGeocoder(values.startingPoint);
		const endingPointData = await forwardGeocoder(values.endingPoint);

		if (startingPointData && endingPointData) {
			const waypoints = {
				startingPoint: {
					name: startingPointData.address.label,
					position: [
						startingPointData.position.lat,
						startingPointData.position.lng
					]
				},
				endingPoint: {
					name: endingPointData.address.label,
					position: [endingPointData.position.lat, endingPointData.position.lng]
				}
			};

			return handleSetRoute(waypoints);
		}

		// TODO: setError
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
