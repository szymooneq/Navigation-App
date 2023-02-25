const filterLocation = (stringCoordinates: string) => {
	const arrayWithCoordinates = stringCoordinates
		.split(',')
		.map((x) => +x)
		.filter((x) => (isNaN(x) ? null : x));

	if (arrayWithCoordinates.length === 2) return arrayWithCoordinates;
};

export const loadLocation = (params: URLSearchParams) => {
	const lat = params.get('lat');
	const lng = params.get('lng');
	const zoom = params.get('zoom');

	if (lat && lng && zoom && !isNaN(+lat) && !isNaN(+lng) && !isNaN(+zoom)) {
		return {
			lat: +lat,
			lng: +lng,
			zoom: +zoom
		};
	}

	return {
		lat: 49.56364,
		lng: 20.63496,
		zoom: 13
	};
};

export const loadRoute = (params: URLSearchParams) => {
	const startParams = params.get('start');
	const endParams = params.get('end');

	if (startParams && endParams) {
		const startingPoint = filterLocation(startParams);
		const endingPoint = filterLocation(endParams);

		if (startingPoint && endingPoint)
			return {
				start: {
					latlng: startingPoint,
					title: ''
				},
				end: {
					latlng: endingPoint,
					title: ''
				}
			};
	}

	return {
		start: {
			latlng: [],
			title: ''
		},
		end: {
			latlng: [],
			title: ''
		}
	};
};
