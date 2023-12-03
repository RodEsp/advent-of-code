import { readfile } from "../../utils/getInput.js";
import { isNumber } from "../../utils/functions.js";

let sum = 0;

/**
 * @param {string[][]} engineDiagram 
 */
const getSum = async (engineDiagram) => {
	// r and c correspond to the indeces for the rows and columns of the engineDiagram
	let r = 0, c = 0;

	while (r < engineDiagram.length) {
		c = findNextAsterisk(c, engineDiagram[r]);
		if (c) {
			const { isGear, gear } = getAsteriskInfo(engineDiagram, r, c);
			if (isGear) {
				sum += gear.partNumbers.reduce((product, num) => product *= num, 1);
			}
			c++;
		} else {
			c = 0;
			r++;
		}
	}
};

const findNextAsterisk = (c, row) => {
	while (c < row.length) {
		if (row[c] === '*') {
			return c;
		}
		c++;
	}

	return null;
};

const getAsteriskInfo = (engineDiagram, r, c) => {
	const partNumbers = [];

	if (r > 0) {
		// Check row above for numbers
		for (let i = c - 1; i <= c + 1; i++) {
			if (isNumber(engineDiagram[r - 1][i])) {
				// Found a single digit, now we need to get the full number
				const number = getNumber(i, engineDiagram[r - 1]);
				partNumbers.push(number.value);

				i = number.end;
			}
		}
	}

	// Check sides for numbers
	if (isNumber(engineDiagram[r][c - 1])) {
		const number = getNumber(c - 1, engineDiagram[r]);
		partNumbers.push(number.value);

	};
	if (isNumber(engineDiagram[r][c + 1])) {
		// Found a digit to the right, need to get full number
		const number = getNumber(c + 1, engineDiagram[r]);
		partNumbers.push(number.value);
	};

	if (r < engineDiagram.length - 1) {
		// Check row below for numbers
		for (let i = c - 1; i <= c + 1; i++) {
			if (isNumber(engineDiagram[r + 1][i])) {
				// Found a single digit, now we need to get the full number
				const number = getNumber(i, engineDiagram[r + 1]);
				partNumbers.push(number.value);

				i = number.end;
			}
		}
	}

	return {
		isGear: partNumbers.length === 2,
		gear: {
			partNumbers
		}
	};
};

const getNumber = (c, row) => {
	let number = '';

	let start = c;
	while (!isNaN(row[start - 1])) start--;
	number += row[start];

	let end = start + 1;
	while (!isNaN(row[end])) {
		number += row[end];
		end++;
	};

	return {
		start,
		end,
		value: Number(number)
	};
};

// This gets the input file and splits it into a 2D array of characters
getSum((await readfile('../../data/puzzle_3.txt')).split('\n').map(line => line.split('')));

console.log(sum);