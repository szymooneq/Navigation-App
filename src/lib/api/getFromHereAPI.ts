import {
	IAutocompleteResponseAPI,
	IForwardResponseAPI,
	IReverseResponseAPI
} from '../interfaces/routeData';

const API_KEY: string = import.meta.env.VITE_GEOCODING_API_KEY;

export const getReverseData = async (
	coordinates: number[]
): Promise<IReverseResponseAPI[]> => {
	return await fetch(
		`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${coordinates[0]},${coordinates[1]}&apiKey=${API_KEY}`
	)
		.then((res) => res.json())
		.then((data) => data.items)
		.catch((error) => console.log(error));
};

export const getAutocompleteData = async (
	value: string
): Promise<IAutocompleteResponseAPI[]> => {
	return await fetch(
		`https://autocomplete.search.hereapi.com/v1/autocomplete?q=${value}&apiKey=${API_KEY}`
	)
		.then((res) => res.json())
		.then((data) => data.items)
		.catch((error) => console.log(error));
};

export const getForwardData = async (
	value: string
): Promise<IForwardResponseAPI[]> => {
	return await fetch(
		`https://geocode.search.hereapi.com/v1/geocode?q=${value}&apiKey=${API_KEY}`
	)
		.then((res) => res.json())
		.then((data) => data.items)
		.catch((error) => console.log(error));
};
