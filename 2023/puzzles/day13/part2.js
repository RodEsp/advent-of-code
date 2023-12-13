import { EOL, type } from 'os';

import { hammingDistance, transpose } from '../../utils/functions.js';
import { readfile } from '../../utils/getInput.js';

let patterns = [...(await readfile('../../data/13.txt')).split(`${EOL}${EOL}`).map((pattern) => pattern.split(EOL).map(row => row.split('')))];
let remainingPatterns = [];
let sum = 0;

function checkIfReflection (r1, r2, pattern, fixedSmudge) {
	if (r1 < 0 || r2 >= pattern.length) {
		return [true, fixedSmudge];
	}

	let foundReflection = false;
	if (fixedSmudge || pattern[r1].toString() === pattern[r2].toString()) {
		[foundReflection, fixedSmudge] = checkIfReflection(r1 - 1, r2 + 1, pattern, fixedSmudge);
		foundReflection = pattern[r1].toString() === pattern[r2].toString() && foundReflection;
	} else if (hammingDistance(pattern[r1], pattern[r2]) === 1) {
		[foundReflection, fixedSmudge] = checkIfReflection(r1 - 1, r2 + 1, pattern, true);
	}
	return [foundReflection, fixedSmudge];
}

function checkRowsForReflection (pattern) {
	let foundReflection = false;
	let fixedSmudge = false;
	for (let r = 0; r < pattern.length - 1; r++) {
		const row = pattern[r];
		const nextRow = pattern[r + 1];

		if (row.toString() == nextRow.toString()) {
			[foundReflection, fixedSmudge] = checkIfReflection(r - 1, r + 2, pattern, false);
		} else if (hammingDistance(row, nextRow) === 1) {
			[foundReflection, fixedSmudge] = foundReflection = checkIfReflection(r - 1, r + 2, pattern, true);
		}

		if (foundReflection && fixedSmudge) {
			return r;
		}
	}

	if (!foundReflection || !fixedSmudge) {
		remainingPatterns.push(pattern);
	}

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
