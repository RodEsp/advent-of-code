import { EOL, type } from 'os';

import { transpose } from '../../utils/functions.js';
import { readfile } from '../../utils/getInput.js';

let patterns = [...(await readfile('../../data/13.txt')).split(`${EOL}${EOL}`).map((pattern) => pattern.split(EOL).map(row => row.split('')))];
let remainingPatterns = [];
let sum = 0;

function checkIfReflection (r1, r2, pattern) {
	if (r1 < 0 || r2 >= pattern.length) {
		return true;
	}
	return pattern[r1].toString() === pattern[r2].toString() && checkIfReflection(r1 - 1, r2 + 1, pattern);
}

function checkRowsForReflection (pattern) {
	let foundReflection = false;
	for (let r = 0; r < pattern.length - 1; r++) {
		foundReflection = checkIfReflection(r, r + 1, pattern);
		if (foundReflection) {
			return r;
		}
	}

	remainingPatterns.push(pattern);
	return null;
}

// Check rows for reflections
patterns.forEach(pattern => {
	const reflectionRow = checkRowsForReflection(pattern);
	if (reflectionRow !== null) {
		sum += 100 * (reflectionRow + 1);
	}
});

// Check columns for reflections
remainingPatterns.forEach(pattern => {
	pattern = transpose(pattern);
	const reflectionRow = checkRowsForReflection(pattern);
	if (reflectionRow !== null) {
		sum += reflectionRow + 1;
	}
});

console.log(sum);
