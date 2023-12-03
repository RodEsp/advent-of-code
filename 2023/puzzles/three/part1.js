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
		const { number, end } = findNextNumber(c, engineDiagram[r]);
		if (number) {
			c = end;
			if (isPartNumber(engineDiagram, number, r, c - number.length)) {
				sum += Number(number);
			}
		} else {
			c = 0;
			r++;
		}
	}
};

const findNextNumber = (c, row) => {
	let number = '';

	while (c < row.length) {
		if (isNumber(row[c])) {
			number += row[c];
		} else if (number !== '') {
			break;
		}
		c++;
	}

	return {
		number,
		end: c
	};
};

const isPartNumber = (engineDiagram, number, r, c) => {
	if (r > 0) {
		// Check row above for symbols
		for (let i = c - 1; i < c + number.length + 1; i++) {
			if (isSymbol(engineDiagram[r - 1][i])) return true;
		}
	}

	// Check sides for symbols
	if (isSymbol(engineDiagram[r][c - 1])) return true;
	if (isSymbol(engineDiagram[r][c + number.length])) return true;

	if (r < engineDiagram.length - 1) {
		// Check row below for symbols
		for (let i = c - 1; i < c + number.length + 1; i++) {
			if (isSymbol(engineDiagram[r + 1][i])) return true;
		}
	}

	return false;
};

const isSymbol = (char) => char !== '.' && char !== undefined && isNaN(char);

// This gets the input file and splits it into a 2D array of characters
getSum((await readfile('../../data/puzzle_3.txt')).split('\n').map(line => line.split('')));

console.log(sum);