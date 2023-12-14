import { EOL } from 'os';

import { getIndices, transpose } from '../../utils/functions.js';
import { readfile } from '../../utils/getInput.js';

let platform = transpose([...(await readfile('../../data/14.txt')).split(EOL).map(row => row.split(''))]).map(row => row.join(''));
let sum = 0;

function tiltPlatform (platform) {
	platform.map(row => {
		const roundedRocks = getIndices('O', row).values();
		const unmovableRocks = getIndices('#', row).values();

		let rR = roundedRocks.next().value;
		let uR = unmovableRocks.next().value || row.length;
		for (let i = 0; i < row.length; i++) {
			if (rR === undefined) {
				break;
			} else if (row[i] === '#') {
				uR = unmovableRocks.next().value || row.length;
			} else if (i <= rR && rR < uR) {
				sum += row.length - i; // This only works because our input is a square matrix (row and column lengths are the same)
				rR = roundedRocks.next().value;
			}
		}
	});
}

tiltPlatform(platform);
console.log(sum);
