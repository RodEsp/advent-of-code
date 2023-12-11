import exp from 'constants';
import { EOL, type } from 'os';
import { readfile } from "../../utils/getInput.js";

let space = [...(await readfile('../../data/11.txt')).split(EOL)];

// Get all the empty rows
const emptyRows = space.flatMap((row, i) => {
	if (row.indexOf('#') === -1) return [i];
	return false;
}).filter(row => row);

// Get all the empty columns
const emptyColumns = [];
for (let c = 0; c < space[0].length; c++) {
	if (space.every(row => row[c] === '.')) emptyColumns.push(c);
};

// Get coordinates for all galaxies
let galaxies = [];
for (let r = 0; r < space.length; r++) {
	for (let c = 0; c < space[r].length; c++) {
		if (space[r][c] === '#') galaxies.push([r, c]);
	}
}

let sum = 0;
// Go through all galaxies and find the min distance between every other galaxy and add that to our sum
for (let i = 0; i < galaxies.length; i++) {
	for (let y = i + 1; y < galaxies.length; y++) {
		const minr = Math.min(galaxies[i][0], galaxies[y][0]);
		const maxr = Math.max(galaxies[i][0], galaxies[y][0]);
		const minc = Math.min(galaxies[i][1], galaxies[y][1]);
		const maxc = Math.max(galaxies[i][1], galaxies[y][1]);

		let emptyRowsBetween = emptyRows.filter(r => minr < r && r < maxr);
		let emptyColsBetween = emptyColumns.filter(c => minc < c && c < maxc);

		sum += maxr - minr + maxc - minc + emptyRowsBetween.length * 999_999 + emptyColsBetween.length * 999_999;
	}
}

console.log(sum);
