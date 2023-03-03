import { useContext, useState } from 'react';
import { getForwardData } from '../../lib/api/getFromHereAPI';
import { RouteContext } from '../../lib/context/RouteProvider';
import { debounce } from '../../lib/helpers/debounce';
import FormControl from './FormControl';

function Form(): JSX.Element {
	const { state, setLoading, setRoute } = useContext(RouteContext);
	const [values, setValues] = useState({
		startingPoint: '',
		endingPoint: ''
	});

	const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSetSuggestion = (
		id: 'startingPoint' | 'endingPoint',
		suggestion: string
	) => {
		setValues((prev) => ({ ...prev, [id]: suggestion }));
	};

	const getWaypoints = debounce(async () => {
		if (
			!values.startingPoint ||
			!values.endingPoint ||
			state.route.waypoints.startingPoint.name === values.startingPoint ||
			state.route.waypoints.endingPoint.name === values.endingPoint
		)
			return;

		setLoading(true);
		const startingPointData = await getForwardData(values.startingPoint);
		const endingPointData = await getForwardData(values.endingPoint);

		if (startingPointData && endingPointData) {
			return setRoute({
				startingPoint: {
					name: startingPointData[0].address.label,
					position: [
						startingPointData[0].position.lat,
						startingPointData[0].position.lng
					]
				},
				endingPoint: {
					name: endingPointData[0].address.label,
					position: [
						endingPointData[0].position.lat,
						endingPointData[0].position.lng
					]
				}
			});
		}

		// TODO: setError
		setLoading(false);
	}, 500);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		getWaypoints();
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl
				id="startingPoint"
				label="Start"
				placeholder="E.g. 123 Main Street, Anytown, USA"
				value={values.startingPoint}
				onChange={handleChangeValue}
				handleSetSuggestion={handleSetSuggestion}
			/>
			<FormControl
				id="endingPoint"
				label="End"
				placeholder="E.g. 456 High Street, Cityville, Canada"
				value={values.endingPoint}
				onChange={handleChangeValue}
				handleSetSuggestion={handleSetSuggestion}
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
