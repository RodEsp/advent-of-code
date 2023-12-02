import fs from 'node:fs';
import readline from 'node:readline';

import Trie from '../../utils/trie.js';

let sum = 0;

const fileStream = fs.createReadStream('./data/puzzle_1.txt');

const rl = readline.createInterface({
	input: fileStream,
	crlfDelay: Infinity
});

const numbers = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', };
const reversedNumbers = ['eno', 'owt', 'eerht', 'rouf', 'evif', 'xis', 'neves', 'thgie', 'enin'];

const trie = new Trie([...Object.keys(numbers), ...reversedNumbers]);

for await (const line of rl) {
	let firstNum, lastNum, leftChar, rightChar,
		left = 0, right = line.length - 1;

	while (!firstNum || !lastNum) {
		leftChar = line[left];
		rightChar = line[right];

		if (!firstNum) {
			if (Number(leftChar)) {
				firstNum = line[left];
			} else if (trie.startsWith(leftChar)) {
				let word;
				for (let i = 2; i <= 5; i++) {
					word = line.substring(left, left + i);
					if (trie.contains(word)) {
						firstNum = numbers[word];
						break;
					}
				}
				if (!firstNum) left++;
			} else {
				left++;
			}
		}

		if (!lastNum) {
			if (Number(rightChar)) {
				lastNum = line[right];
			} else if (trie.startsWith(rightChar)) {
				let word;
				for (let i = 2; i <= 5; i++) {
					word = line.substring(right + 1 - i, right + 1);
					if (trie.contains(word)) {
						lastNum = numbers[word];
						break;
					}
				}
				if (!lastNum) right--;
			} else {
				right--;
			}
		}
	}

	// Here we are concatenating the string values of first and last, and then turning that into a number before adding it to sum.
	sum += Number(firstNum + lastNum);
}

console.log(sum);