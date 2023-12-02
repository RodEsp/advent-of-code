import { once } from "node:events";
import { rline } from "../../utils/readfile.js";

const rl = rline('../../data/puzzle_2.txt');

let getGameInfo = (line) => {
	return {
		gameNumber: Number(line.match(/Game\s([0-9]*)/)[1]),
		reds: Math.max(...[...line.matchAll(/([0-9]*)\sred/g)].map((match) => Number(match[1]))),
		greens: Math.max(...[...line.matchAll(/([0-9]*)\sgreen/g)].map((match) => Number(match[1]))),
		blues: Math.max(...[...line.matchAll(/([0-9]*)\sblue/g)].map((match) => Number(match[1]))),
	};
};

let sum = 0;
rl.on('line', async (line) => {
	const { gameNumber, reds, greens, blues } = getGameInfo(line);

	if (reds > 12 || greens > 13 || blues > 14) return;
	sum += gameNumber;
});

// Wait for all of the lines to be read and processed
await once(rl, 'close');

console.log(sum);