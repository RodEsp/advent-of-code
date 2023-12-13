import { EOL } from "os";
import { readfile } from "../../utils/getInput.js";

function parseInput (input) {
	let [times, distances] = input.split(EOL).map(line => line.match(/\d+/g).map(n => Number(n)));

	const races = [];
	for (let i = 0; i < times.length; i++) {
		races.push({
			time: times[i],
			distance: distances[i]
		});
	}

	return races;
};

const races = parseInput(await readfile('../../data/6.txt'));

function quadraticEquation ({ totaltime: b, distance: c }) {
	b = b * -1;
	const root_part = Math.sqrt(b * b - 4 * c);

	var upper_root = (-b + root_part) / 2;
	var lower_root = (-b - root_part) / 2;

	return [upper_root, lower_root];
};

const product = races.reduce((product, race) => {
	let [upper, lower] = quadraticEquation({ totaltime: race.time, distance: race.distance + 1 });
	return product *= Math.floor(upper) - Math.ceil(lower) + 1;
}, 1);

console.log(product);
