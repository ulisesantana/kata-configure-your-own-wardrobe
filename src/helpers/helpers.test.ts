import {
	isInsideTheLimit,
	canAddMoreElements,
	calcTheBestOption,
	getCombination,
	isTheSameArray
} from './helpers';

describe('Helpers should', () => {
	it('check 2 arrays are the same', () => {
		expect(isTheSameArray([20, 10], [10, 20])).toBe(true);
	});

	it('check if the combination fits the limit and retrieve how much left to get the limit', () => {
		expect(isInsideTheLimit(100, [10, 20])).toStrictEqual([true, 70]);
		expect(isInsideTheLimit(250, [120])).toStrictEqual([true, 130]);
		expect(isInsideTheLimit(100, [10, 20, 30, 40])).toStrictEqual([true, 0]);
		expect(isInsideTheLimit(100, [10, 20, 30, 40, 50])).toStrictEqual([
			false,
			50
		]);
	});

	it('check if more elements can be added to fit the limit', () => {
		expect(canAddMoreElements(250, [50, 75, 100, 120], [])).toBe(true);
		expect(canAddMoreElements(250, [50, 75, 100, 120], [50, 75])).toBe(true);
		expect(canAddMoreElements(250, [50, 75, 100, 120], [50, 75, 75])).toBe(
			true
		);
		expect(canAddMoreElements(250, [50, 75, 100, 120], [250])).toBe(false);
		expect(canAddMoreElements(250, [50, 75, 100, 120], [210])).toBe(false);
	});

	it('calc the best option to fit the limit', () => {
		expect(calcTheBestOption(45, [50, 75, 100, 120])).toBe(0);
		expect(calcTheBestOption(50, [50, 75, 100, 120])).toBe(50);
		expect(calcTheBestOption(55, [50, 75, 100, 120])).toBe(50);
		expect(calcTheBestOption(70, [50, 75, 100, 120])).toBe(50);
		expect(calcTheBestOption(75, [50, 75, 100, 120])).toBe(75);
		expect(calcTheBestOption(90, [50, 75, 100, 120])).toBe(75);
		expect(calcTheBestOption(100, [50, 75, 100, 120])).toBe(100);
		expect(calcTheBestOption(115, [50, 75, 100, 120])).toBe(100);
		expect(calcTheBestOption(120, [50, 75, 100, 120])).toBe(120);
	});

	it('get combination for a given number of options', () => {
		expect(getCombination(250, [50])).toStrictEqual([50, 50, 50, 50, 50]);
		expect(getCombination(250, [50, 75])).toStrictEqual([50, 50, 75, 75]);
		expect(getCombination(250, [50, 75, 100])).toStrictEqual([50, 100, 100]);
		expect(getCombination(250, [75, 100])).toStrictEqual([75, 75, 100]);
		expect(getCombination(250, [75, 100, 120])).toStrictEqual([0]);
		expect(getCombination(250, [120])).toStrictEqual([0]);
	});
});
