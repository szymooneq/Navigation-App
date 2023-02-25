export interface IRouteDataApi {
	title: string;
	id: string;
	politicalView?: string;
	resultType?:
		| 'administrativeArea'
		| 'locality'
		| 'street'
		| 'intersection'
		| 'addressBlock'
		| 'houseNumber'
		| 'postalCodePoint'
		| 'place';
	houseNumberType?: 'PA' | 'interpolated';
	addressBlockType?: 'block' | 'subblock';
	localityType?: 'postalCode' | 'subdistrict' | 'district' | 'city';
	administrativeAreaType?: 'county' | 'state' | 'country';
	address: {
		label?: string;
		countryCode?: string;
		countryName?: string;
		stateCode?: string;
		state?: string;
		countyCode?: string;
		county?: string;
		city?: string;
		district?: string;
		subdistrict?: string;
		street?: string;
		block?: string;
		subblock?: string;
		postalCode?: string;
		houseNumber?: string;
		building?: string;
	};
	position: IRouteDataPosition;
}

interface IRouteDataPosition {
	lat: number;
	lng: number;
}
