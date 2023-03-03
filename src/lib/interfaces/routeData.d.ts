interface Base {
	title: string;
	id: string;
	resultType: string;
	address: {
		label: string;
		countryCode: string;
		countryName: string;
		state: string;
		county: string;
		city: string;
		district: string;
		street: string;
		postalCode: string;
	};
}

export interface IReverseResponseAPI extends Base {
	position: IPosition;
	mapView: IMapView;
	distance: number;
}

export interface IForwardResponseAPI extends Base {
	position: IPosition;
	mapView: IMapView;
	scoring: {
		queryScore: number;
		fieldScore: {
			country: number;
			district: number;
			streets: number[];
			postalCode: number;
		};
	};
}

export interface IAutocompleteResponseAPI extends Base {
	language: string;
	houseNumberType: string;
	highlights: {
		title: IHighlight[];
		address: {
			label: IHighlight[];
			district: IHighlight[];
			street: IHighlight[];
			houseNumber: IHighlight[];
		};
	};
}

interface IPosition {
	lat: number;
	lng: number;
}

interface IMapView {
	west: number;
	south: number;
	east: number;
	north: number;
}

interface IHighlight {
	start: number;
	end: number;
}
