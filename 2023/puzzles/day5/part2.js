import { EOL } from 'os';
import { readfile } from '../../utils/getInput.js';

const input = await readfile('../../data/puzzle_5.txt');

const parseInput = (input) => {
	let [seedRanges, ...maps] = input.match(/.*:\s([\d\s]+)/g);
	seedRanges = seedRanges.match(/[\d\s]+/)[0].trim().match(/\d+\s\d+/g);
	seedRanges = seedRanges.map(s => s.split(' ').map(n => Number(n)));

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

	return { seedRanges, maps };
};

const { seedRanges, maps } = parseInput(input);

const applyMaps = (num, maps) => {
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

const rangeMap = (num, map) => {
	if (map.source.start <= num && num < map.source.end) {
		return num - map.source.start + map.dest.start;
	}

	return num;
};

const locations = seedRanges.map(([start, range]) => {
	let min = Number.MAX_SAFE_INTEGER;

	for (let i = 0; i < range; i++) {
		min = Math.min(min, applyMaps(start + i, maps));
	}

	return min;
});

console.log(Math.min(...locations));
