import { memoize } from '../../utils/functions.js';
import { readfile } from '../../utils/getInput.js';

let initSequence = (await readfile('../../data/15.txt')).split(',');
let sum = 0;

function hash (str) {
	let hash = 0;

	for (const c of str) {
		hash += c.charCodeAt(0);
		hash *= 17;
		hash %= 256;
	}

	return hash;
}

let mhash = memoize(hash);

initSequence.forEach((str) => {
	sum += mhash(str);
});

console.log(sum);
