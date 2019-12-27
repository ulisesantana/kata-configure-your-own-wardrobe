import {getCombinationsFor, getTheCheapestCombination} from '.';

describe('Wardrobe elements calculator should', () => {
	it('return an array of combinations', () => {
		const combo = getCombinationsFor(250, [50, 75, 100, 120]);
		expect(Array.isArray(combo[0])).toBe(true);
		expect(typeof combo[0][0] === 'number').toBe(true);
	});

	it('return all possible combinations', () => {
		const expected = [
			[50, 50, 75, 75],
			[50, 50, 50, 50, 50],
			[75, 75, 100],
			[50, 100, 100]
		];
		const combo = getCombinationsFor(250, [50, 75, 100, 120]);
		expect(combo.length).toStrictEqual(expected.length);
		expect(combo).toStrictEqual(expected);
	});

	it('return the cheapest combination', () => {
		const priceList = {
			'50': 59,
			'75': 62,
			'100': 90,
			'120': 111
		};
		const expected = [[75, 75, 100]];
		const combo = getTheCheapestCombination(250, [50, 75, 100, 120], priceList);
		expect(combo).toStrictEqual(expected);
	});
});
