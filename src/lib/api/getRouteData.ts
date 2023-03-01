import { IRouteDataApi } from '../interfaces/routeData';

const apiKey: string = import.meta.env.VITE_GEOCODING_API_KEY;

export const getRouteData = async (coordinates: number[]): Promise<string> => {
	return await fetch(
		`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${coordinates[0]},${coordinates[1]}&apiKey=${apiKey}`
	)
		.then((res) => res.json())
		.then((data) => data.items[0].title)
		.catch((error) => console.log(error));
};

export const getSuggestions = async (value: string): Promise<any> => {
	return await fetch(
		`https://autocomplete.search.hereapi.com/v1/autocomplete?q=${value}&apiKey=${apiKey}`
	)
		.then((res) => res.json())
		.then((data) => data.items)
		.catch((error) => console.log(error));
};

export const forwardGeocoder = async (value: string): Promise<any> => {
	return await fetch(
		`https://geocode.search.hereapi.com/v1/geocode?q=${value}&apiKey=${apiKey}`
	)
		.then((res) => res.json())
		.then((data) => data.items[0].position)
		.catch((error) => console.log(error));
};
