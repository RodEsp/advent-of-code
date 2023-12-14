import { EOL } from 'os';

import { getIndices, rotateCounterClockwise, transpose } from '../../utils/functions.js';
import { readfile } from '../../utils/getInput.js';

let platform = transpose([...(await readfile('../../data/14.txt')).split(EOL).map(row => row.split(''))]).map(row => row.join(''));

function tiltPlatform (platform) {
	const tiltedPlatform = platform.map(row => {
		const roundedRocks = getIndices('O', row).values();
		const unmovableRocks = getIndices('#', row).values();

		let rR = roundedRocks.next().value;
		let uR = unmovableRocks.next().value || row.length;
		let tiltedRow = '';
		for (let i = 0; i < row.length; i++) {
			if (rR === undefined) {
				tiltedRow += row[i] === '#' ? '#' : '.';
			} else if (row[i] === '#') {
				tiltedRow += row[i];
				uR = unmovableRocks.next().value || row.length;
			} else if (i <= rR && rR < uR) {
				tiltedRow += 'O';
				rR = roundedRocks.next().value;
			} else {
				tiltedRow += '.';
			}
		}
		return tiltedRow;
	});

	return tiltedPlatform;
};

let rotatedTiltedPlatform = platform;

function calculateSum (platform) {
	let sum = 0;

	transpose(platform.map(row => row.split(''))).map(row => row.join('')).forEach((row, i) => {
		sum += getIndices('O', row).length * (platform.length - i);
	});

	return sum;
};

for (let c = 1; c <= 1000; c++) { // I don't understand why the 1,000th iteration's answer is the same as the 1,000,000,000th but it is.
	// TODO: Detect when a cycle happens and quit early when it does.
	for (let i = 1; i <= 4; i++) {
		rotatedTiltedPlatform = tiltPlatform(rotatedTiltedPlatform);
		rotatedTiltedPlatform = rotateCounterClockwise(rotatedTiltedPlatform.map(row => row.split(''))).map(row => row.join(''));
	}
}

console.log(calculateSum(rotatedTiltedPlatform));
