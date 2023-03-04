import { areEqual } from '../areEqual';

describe('areEqual()', () => {
	it('Arrays are no equal', () => {
		expect(areEqual([1, 2, 3], [1, 2])).toBe(false);
	});

	it('Arrays are equal', () => {
		expect(areEqual([1, 2, 3], [1, 2, 3])).toBe(true);
	});

	it('Objects are no equal', () => {
		expect(areEqual({ 1: 'one' }, { 1: 'one', 2: 'two' })).toBe(false);
	});

	it('Objects are equal', () => {
		expect(areEqual({ 1: 'one' }, { 1: 'one' })).toBe(true);
	});
});
