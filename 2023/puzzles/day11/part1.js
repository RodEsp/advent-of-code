import exp from 'constants';
import { EOL, type } from 'os';
import { readfile } from "../../utils/getInput.js";

let space = [...(await readfile('../../data/11.txt')).split(EOL)];

const expandSpace = (space) => {
	// Get all the empty rows
	const emptyRows = space.flatMap((row, i) => {
		if (row.indexOf('#') === -1) return [i];
		return false;
	}).filter(row => row);
	emptyRows.reverse();

	// Get all the empty columns
	const emptyColumns = [];
	for (let c = 0; c < space[0].length; c++) {
		if (space.every(row => row[c] === '.')) emptyColumns.push(c);
	};
	emptyColumns.reverse();

	// Duplicate the empty columns
	const eSpace = space.map((row) => {
		emptyColumns.forEach(c => {
			row = [row.slice(0, c), '.', row.slice(c)].join('');
		});
		return row;
	});

	// Duplicate the empty rows
	emptyRows.forEach(r => {
		eSpace.splice(r, 0, eSpace[r]);
	});

	return eSpace;
};

const expandedSpace = expandSpace(space);

// Get coordinates for all galaxies
let galaxies = [];
for (let r = 0; r < expandedSpace.length; r++) {
	for (let c = 0; c < expandedSpace[r].length; c++) {
		if (expandedSpace[r][c] === '#') galaxies.push([r, c]);
	}
}

let sum = 0;
// Go through all galaxies and find the min distance between every other galaxy and add that to our sum
for (let i = 0; i < galaxies.length; i++) {
	for (let y = i; y < galaxies.length; y++) {
		sum += Math.abs(galaxies[i][0] - galaxies[y][0]) + Math.abs(galaxies[i][1] - galaxies[y][1]);
	}
}

console.log(sum);
