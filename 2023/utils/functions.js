export const isNumber = (number) => !isNaN(number);

export const memoize = (fn) => {
	const cache = new Map();

	return (...args) => {
		const key = JSON.stringify(args);

		if (cache.has(key)) return cache.get(key);

		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
};

// https://en.wikipedia.org/wiki/Transpose
export const transpose = (matrix) => {
	return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};
