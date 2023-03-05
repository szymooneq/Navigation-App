import { recalculatePrice } from '../helpers/recalculatePrice';

describe('calculatePrice()', () => {
	it('Recalculate for rate 2 and 200km', () => {
		expect(recalculatePrice('2', 200)).toBe(440);
	});

	it('Recalculate for rate 1.5 and 1600km', () => {
		expect(recalculatePrice('1.5', 1600)).toBe(4640);
	});

	it('Recalculate without describe rate and 800km', () => {
		expect(recalculatePrice('', 800)).toBe(0);
	});

	it('Recalculate with wrong rate and 800km', () => {
		expect(recalculatePrice('abcd', 800)).toBe(0);
	});
});
