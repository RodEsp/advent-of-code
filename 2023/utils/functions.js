/**
 * @param { string } char
 * @param { string } string
 */
export function getIndices (char, string) {
	return [...string.matchAll(new RegExp(`${char}`, 'g'))].map(a => a.index);
}

/**
 * @param { String | [] } a
 * @param { String | [] } b
 * @return { number }
 */
export function hammingDistance (a, b) {
	if (a.length !== b.length) throw new Error('Hamming distance can only be computed between two objects of the same length.');

	let count = 0;
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) count++;
	}
	return count;
};

/**
 * @param {number} number 
 * @returns { boolean }
 */
export function isNumber (number) { return !isNaN(number); };

/**
 * @param { function } fn 
 * @returns { function }
 */
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

/**
 * @param { {T: any}[][] } matrix 
 * @returns { {T: any}[][] }
 */
export function rotateCounterClockwise (matrix) {
	return matrix[0].map((val, index) => matrix.map(row => row[row.length - 1 - index]));
}

/**
 * Transposes a 2D array: https://en.wikipedia.org/wiki/Transpose
 * @param { {T: any}[][] } matrix 
 * @returns { {T: any}[][] }
 */
export function transpose (matrix) {
	return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};