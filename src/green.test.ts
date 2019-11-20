type Combination = number[];

function getCombinationsFor(limit: number, options: number[]): Combination {
	if (limit) {
		return options;
	}

	return [];
}

describe('Get element combinations for a given width', () => {
	it('should be always green', () => {
		expect(true).toBe(true);
	});

	it('should return an array', () => {
		const combo = getCombinationsFor(250, [50, 75, 100, 120]);
		expect(Array.isArray(combo)).toBe(true);
	});
});
