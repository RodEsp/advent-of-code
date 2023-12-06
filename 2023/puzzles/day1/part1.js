import { once } from "node:events";
import { readline } from "../../utils/getInput.js";

let sum = 0;
const getSum = async (line) => {
	let first, last,
		left = 0, right = line.length;

	while (!first || !last) {
		if (Number(line[left])) first = line[left];
		else left++;

		if (Number(line[right])) last = line[right];
		else right--;
	}

	// Here we are concatenating the string values of first and last, and then turning that into a number before adding it to sum.
	sum += Number(first + last);
};

// This reads each line of the input file asynchronously and waits until all of them have been read.
await once(readline('../../data/1.txt').on('line', getSum), 'close');

console.log(sum);
