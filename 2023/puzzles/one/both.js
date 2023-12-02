import { once } from 'node:events';
import fs from 'node:fs';
import readline from 'node:readline';

import Trie from '../../utils/trie.js';

// Create a readable stream that will allow us to read the input file line by line.
const fileStream = fs.createReadStream('./data/puzzle_1.txt');
const rl = readline.createInterface({
	input: fileStream,
	crlfDelay: Infinity
});

// Create a trie that will be used if we're doing part2 of this puzzle
let trie;
let numbers;
if (process.argv[2] === 'part2') {
	numbers = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', };
	trie = new Trie([...Object.keys(numbers), 'eno', 'owt', 'eerht', 'rouf', 'evif', 'xis', 'neves', 'thgie', 'enin']);
} else {
	trie = new Trie();
}

/**
 * Returns the first or last number in the given line as a string
 * @param {Object} params
 * @param {string} params.line
 * @param {'first' | 'last'} params.position
*/
const getNumber = async ({ line, position }) => {
	let char;
	let num;

	// Assign index, moveIndex, and getSubString based on whether we're getting the first or last number in the line.
	let [index, moveIndex, getSubString] = {
		first: [
			0,
			() => index++,
			(i) => line.substring(index, index + i)
		],
		last: [
			line.length - 1,
			() => index--,
			(i) => line.substring(index + 1 - i, index + 1)
		]
	}[position];

	while (!num) {
		char = line[index];
		if (Number(char)) {
			num = line[index];
		} else if (trie.startsWith(char)) {
			let word;
			for (let i = 2; i <= 5; i++) {
				word = getSubString(i);
				if (trie.contains(word)) {
					num = numbers[word];
					break;
				}
			}
			if (!num) moveIndex();
		} else {
			moveIndex();
		}
	}

	return num;
};

let sum = 0;
rl.on('line', async (line) => { // Using the 'line' event allows us to process all lines asynchonously which improves performance.
	let [firstNum, lastNum] = await Promise.all([
		getNumber({ line, position: 'first' }),
		getNumber({ line, position: 'last' })
	]);

	// Here we are concatenating the string values of first and last numbers in the line, 
	// and then turning that into a number before adding it to sum.
	sum += Number(firstNum + lastNum);
});

// Wait for all of the lines to be read and processed
await once(rl, 'close');
// Print the final sum
console.log(sum);