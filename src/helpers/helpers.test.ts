import {
	calcMinMaxFor,
	getCombinationsByGroupsOf,
	getNumberOfCombinations
} from './helpers';

describe('Helpers should', () => {
	it('calculate amount of possible combinations', () => {
		expect(getNumberOfCombinations(3, 2)).toBe(6);
		expect(getNumberOfCombinations(4, 5)).toBe(56);
	});

	it('calculate min and max number of elements needed to reach the limit', () => {
		const limit = 250;
		const options = [50, 75, 100, 120];

		expect(calcMinMaxFor(limit, options).min).toBe(3);
		expect(calcMinMaxFor(limit, options).max).toBe(5);
    });
    
    test.todo('generate a valid combination for a given number of elements and grouped by a given length')

	xit('generate all possible combinations for a given number of elements in groups with a given length', () => {
		const limit = 2;
		const options = [1, 2, 3];
		const combinations = getCombinationsByGroupsOf(limit)(options);
		const expected = [
			[1, 1],
			[1, 2],
			[1, 3],
			[2, 2],
			[2, 3],
			[3, 3]
		];
		console.log(JSON.stringify(combinations, null, 2));
		expect(combinations.length).toBe(expected.length);
		expect(combinations[0].length).toBe(limit);
	});
});
