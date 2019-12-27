export function isTheSameArray(arr1: number[], arr2: number[]): boolean {
	if (Array.isArray(arr1) && Array.isArray(arr2)) {
		const a = [...arr1].sort();
		const b = [...arr2].sort();
		// Console.log('isTheSameArray', a, b);
		return a.every((x, i) => x === b[i]);
	}

	return false;
}

export function isInsideTheLimit(
	limit: number,
	combo: number[]
): [boolean, number] {
	const comboSum = combo.reduce((acc, x) => x + acc, 0);
	if (comboSum > limit) {
		return [false, comboSum - limit];
	}

	return [true, limit - comboSum];
}

export function canAddMoreElements(
	limit: number,
	elements: number[],
	toEvaluate: number[]
): boolean {
	const [isInTheLimit, diffToLimit] = isInsideTheLimit(limit, toEvaluate);

	if (isInTheLimit && Boolean(diffToLimit)) {
		return Math.min(...elements) <= diffToLimit;
	}

	return false;
}

const getTheHighestPossibleOption = (
	acc: number[],
	option: number[]
): number[] => (option[1] <= acc[1] && option[0] > acc[0] ? option : acc);

export function calcTheBestOption(x: number, options: number[]): number {
	if (x >= Math.min(...options)) {
		const [result] = options
			.map(option => [option, x % option])
			.reduce(getTheHighestPossibleOption, [0, Infinity]);
		return result;
	}

	return 0;
}

export function getCombination(
	limit: number,
	options: number[],
	result: number[] = []
): number[] {
	if (canAddMoreElements(limit, options, result)) {
		const [, diff] = isInsideTheLimit(limit, result);
		const newResult = calcTheBestOption(diff, options);
		const finalDiff = diff - newResult;

		if (finalDiff === 0 || finalDiff >= Math.min(...options)) {
			return getCombination(limit, options, [...result, newResult]);
		}

		return [0];
	}

	return result;
}
