import { once } from "node:events";
import { rline } from "../../utils/readfile.js";

const rl = rline('../../data/puzzle_2.txt');

let getGameInfo = (line) => {
	return {
		blues: Math.max(1, ...[...line.matchAll(/([0-9]*)\sblue/g)].map((match) => Number(match[1]))),
		reds: Math.max(1, ...[...line.matchAll(/([0-9]*)\sred/g)].map((match) => Number(match[1]))),
		greens: Math.max(1, ...[...line.matchAll(/([0-9]*)\sgreen/g)].map((match) => Number(match[1])))
	};
};

let sum = 0;
rl.on('line', async (line) => {
	const { blues, reds, greens } = getGameInfo(line);

	sum += blues * reds * greens;
});

// Wait for all of the lines to be read and processed
await once(rl, 'close');

console.log(sum);