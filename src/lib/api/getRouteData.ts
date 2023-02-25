import { IRouteDataApi } from '../interfaces/routeData';

export const getRouteData = async (coordinates: number[]): Promise<string> => {
	return await fetch(
		`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${coordinates[0]},${
			coordinates[1]
		}&q=petrol+station&apiKey=${import.meta.env.VITE_GEOCODING_API_KEY}`
	)
		.then((res) => res.json())
		.then((data) => data.items[0].title)
		.catch((error) => console.log(error));
};
