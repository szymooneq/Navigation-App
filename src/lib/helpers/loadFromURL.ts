export const convertStringToWaypoint = (stringCoordinates: string) => {
	const arrayWithCoordinates = stringCoordinates
		.split(',')
		.map((x) => +x)
		.filter((x) => (isNaN(x) ? null : x));

	if (arrayWithCoordinates.length === 2) return arrayWithCoordinates;
};

export const loadRouteWaypointsFromURL = (params: URLSearchParams) => {
	const startParams = params.get('start');
	const endParams = params.get('end');

	if (startParams && endParams) {
		const startingPoint = convertStringToWaypoint(startParams);
		const endingPoint = convertStringToWaypoint(endParams);

		if (startingPoint && endingPoint) return [startingPoint, endingPoint];
	}

	return [];
};
