import { once } from "node:events";

import { readline } from "../../utils/getInput.js";
import Trie from '../../utils/trie.js';

const numbers = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', };
const reversedNumbers = ['eno', 'owt', 'eerht', 'rouf', 'evif', 'xis', 'neves', 'thgie', 'enin'];
const trie = new Trie([...Object.keys(numbers), ...reversedNumbers]);

/** getNumber
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
const getSum = async (line) => {
	const [firstNum, lastNum] = await Promise.all([
		getNumber({ line, position: 'first' }),
		getNumber({ line, position: 'last' })
	]);

	// Here we are concatenating the string values of first and last, and then turning that into a number before adding it to sum.
	sum += Number(firstNum + lastNum);
};

// This reads each line of the input file asynchronously and waits until all of them have been read.
await once(readline('../../data/puzzle_1.txt').on('line', getSum), 'close');

console.log(sum);
