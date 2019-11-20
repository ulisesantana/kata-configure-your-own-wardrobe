const getFactorial = (n: number): number =>
	n === 0 ? 1 : n * getFactorial(n - 1);

export function getNumberOfCombinations(
	numberOfOptions: number,
	sizeOfGroup: number
): number {
	return (
		getFactorial(numberOfOptions + (sizeOfGroup - 1)) /
		(getFactorial(numberOfOptions - 1) * getFactorial(sizeOfGroup))
	);
}

function getCombinationByGroupOf(
	limit: number,
	options: number[],
	i: number,
	acc: number[] = []
): number[] {
	if (acc.length === limit) {
		console.log('getCombinationByGroupOf', i, acc)
		return acc;
	}

	return getCombinationByGroupOf(limit, options, i, acc.concat(options[i]));
}

function getAllCombinationsGroupedBy(
	limit: number,
	options: number[],
	acc: number[][] = [],
	i = 0,
	j = 0
): number[][] {
	console.log(i, j);
	if (i === options.length) {
		console.log('i === options.length', i, j);
		return acc;
	}

	if (j >= options.length) {
		console.log('j >= options.length', i, j);

		return getAllCombinationsGroupedBy(
			limit,
			options,
			acc.concat(getCombinationByGroupOf(limit, options, i)),
			i + 1,
			i + 1
		);
	}

	return getAllCombinationsGroupedBy(
		limit,
		options,
		acc.concat(getCombinationByGroupOf(limit, options, (i + j))),
		i,
		j + 1
	);
}

export function calcMinMaxFor(
	limit: number,
	options: number[]
): {min: number; max: number} {
	return {
		min: Math.ceil(limit / Math.max(...options)),
		max: Math.ceil(limit / Math.min(...options))
	};
}

export function getCombinationsByGroupsOf(
	limit: number
): (options: number[]) => number[][] {
	return (options: number[]) => {
		return new Array(getNumberOfCombinations(options.length, limit)).fill(
			getAllCombinationsGroupedBy(limit, options)
		);
		// Return options.map((_,i) => {
		// 		console.log(limit, 'inside')
		// 		return options.map((_, j) => {
		//             console.log(options[j + i])
		//             return options[i + j]
		//         })
		// 	});
	};
}
