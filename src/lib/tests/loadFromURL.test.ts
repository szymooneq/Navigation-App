import { loadWaypointsFromURL } from '../helpers/loadFromURL';

describe('loadWaypointsFromURL()', () => {
	it('Search params have correct values', () => {
		const params = new URLSearchParams(
			'start=50.06045%2C19.93242&end=52.2356%2C21.01037'
		);
		expect(loadWaypointsFromURL(params)).toStrictEqual([
			[50.06045, 19.93242],
			[52.2356, 21.01037]
		]);
	});

	it('Search params have incorrect values', () => {
		const params = new URLSearchParams(
			'start=50.06,04.5%2C19.93242&end=asdfasf'
		);
		expect(loadWaypointsFromURL(params)).toStrictEqual([]);
	});

	it('Search params have missing start values', () => {
		const params = new URLSearchParams('end=52.2356%2C21.01037');
		expect(loadWaypointsFromURL(params)).toStrictEqual([]);
	});

	it('One of search params value is null', () => {
		const params = new URLSearchParams('start=&end=52.2356%2C21.01037');
		expect(loadWaypointsFromURL(params)).toStrictEqual([]);
	});

	it('One of search params value is string', () => {
		const params = new URLSearchParams(
			'start=asfdasf,gsadgs&end=52.2356%2C21.01037'
		);
		expect(loadWaypointsFromURL(params)).toStrictEqual([]);
	});
});
