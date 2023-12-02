import fs from 'node:fs';
import readline from 'node:readline';

let sum = 0;

const fileStream = fs.createReadStream('./data/puzzle_1.txt');

const rl = readline.createInterface({
	input: fileStream,
	crlfDelay: Infinity
});

for await (const line of rl) {
	let first, last, left = 0, right = line.length;
	while (!first || !last) {
		if (isNaN(line[left])) left++;
		else first = line[left];

		if (isNaN(line[right])) right--;
		else last = line[right];
	}

	// Here we are concatenating the string values of first and last, and then turning that into a number before adding it to sum.
	sum += Number(first + last);
}

console.log(sum);