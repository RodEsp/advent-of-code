import { EOL } from 'os';
import { readfile } from '../../utils/getInput.js';

const input = await readfile('../../data/5.txt');

function parseInput (input) {
	let [seeds, ...maps] = input.match(/.*:\s([\d\s]+)/g);
	seeds = seeds.match(/[\d\s]+/)[0].trim().split(' ').map(n => Number(n));

	maps = maps.map(m => m.split(EOL))
		.map(m => m.filter(s => /\d+\s\d+\s\d+/.test(s)))
		.map(m =>
			m.map(s => {
				const [dest, source, range] = s.split(' ').map(n => Number(n));;
				return {
					dest: {
						start: dest,
						end: dest + range
					},
					source: {
						start: source,
						end: source + range
					}
				};
			})
		);

	return { seeds, maps };
};

const { seeds, maps } = parseInput(input);

function applyMaps (num, maps) {
	if (maps.length === 0) {
		return num;
	}

	return applyMaps(
		maps[0].reduce(
			(n, map) =>
				n === num ? rangeMap(n, map) : n,
			num
		),
		maps.slice(1));
};

function rangeMap (num, map) {
	if (map.source.start <= num && num < map.source.end) {
		return num - map.source.start + map.dest.start;
	}

	return num;
};

const locations = seeds.map((num) => applyMaps(num, maps));

console.log(Math.min(...locations));
