import { EOL } from "os";
import { readfile } from "../../utils/getInput.js";

function parseInput (input) {
	let [time, distance] = input.split(EOL).map(line => line.match(/\d+/g).reduce((num_str, str) => num_str += str, '')).map(n => Number(n));
	return {
		time,
		distance
	};
};

const race = parseInput(await readfile('../../data/6.txt'));

function quadraticEquation ({ totaltime: b, distance: c }) {
	b = b * -1;
	const root_part = Math.sqrt(b * b - 4 * c);

	var upper_root = (-b + root_part) / 2;
	var lower_root = (-b - root_part) / 2;

	return [upper_root, lower_root];
};

let [upper, lower] = quadraticEquation({ totaltime: race.time, distance: race.distance + 1 });

console.log(Math.floor(upper) - Math.ceil(lower) + 1);
