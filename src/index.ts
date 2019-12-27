import {getCombination, isTheSameArray} from './helpers';

const reduceCleanRepeatedCombinations = (
	acc: number[][],
	x: number[]
): number[][] => (acc.some(y => isTheSameArray(x, y)) ? acc : [...acc, x]);

const filterEmptyValues = ([x]: number[]): boolean => Boolean(x);

const generateRawCombinationsFor = (limit: number) => (
	acc: number[][],
	option: number,
	i: number,
	options: number[]
) => [
	...acc,
	getCombination(limit, [option, options[i < options.length - 1 ? i + 1 : i]]),
	getCombination(limit, [option]),
	getCombination(
		limit,
		options.filter(x => x !== option)
	)
];
type ComboWithPrice = [number[], number];
type CombosAndPrices = {
	combinations: ComboWithPrice[];
	prices: number[];
};

const transformToComboWithPrice = (priceList: Record<string, number>) => (
	x: number[]
): ComboWithPrice =>
	[
		x,
		x
			.map(y => priceList[y.toString()])
			.reduce((acc: number, z: number) => acc + z, 0)
	] as ComboWithPrice;

const reduceCombinationsWithPrices = (
	acc: CombosAndPrices,
	x: ComboWithPrice
): CombosAndPrices => ({
	combinations: acc.combinations.concat([x]),
	prices: acc.prices.concat(x[1])
});

export function getCombinationsFor(
	limit: number,
	options: number[]
): number[][] {
	return options
		.reduce(generateRawCombinationsFor(limit), [] as number[][])
		.filter(filterEmptyValues)
		.reduce(reduceCleanRepeatedCombinations, [] as number[][]);
}

export function getTheCheapestCombination(
	limit: number,
	options: number[],
	priceList: Record<string, number>
): number[][] {
	const {combinations, prices} = getCombinationsFor(limit, options)
		.map(transformToComboWithPrice(priceList))
		.reduce(reduceCombinationsWithPrices, {
			combinations: [] as ComboWithPrice[],
			prices: [] as number[]
		} as CombosAndPrices);

	const cheapestPrice = Math.min(...prices);

	return combinations
		.filter(([, price]) => price === cheapestPrice)!
		.map(([combo]) => combo);
}
