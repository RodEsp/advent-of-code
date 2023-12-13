export function isNumber (number) { return !isNaN(number); };

export function memoize (fn) {
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
export function transpose (matrix) {
	return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

/**
 * @param { String | [] } a
 * @param { String | [] } b
 */
export function hammingDistance (a, b) {
	if (a.length !== b.length) throw new Error('Hamming distance can only be computed between two objects of the same length.');

	let count = 0;
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) count++;
	}
	return count;
};
