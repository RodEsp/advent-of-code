import { once } from "node:events";
import { rline } from "../../utils/readfile.js";

const rl = rline('../../data/puzzle_2.txt');

let getGameInfo = (line) => {
	return {
		gameNumber: Number(line.match(/Game\s([0-9]*)/)[1]),
		blues: [...line.matchAll(/([0-9]*)\sblue/g)].map((match) => Number(match[1])),
		reds: [...line.matchAll(/([0-9]*)\sred/g)].map((match) => Number(match[1])),
		greens: [...line.matchAll(/([0-9]*)\sgreen/g)].map((match) => Number(match[1]))
	};
};

let sum = 0;
rl.on('line', async (line) => {
	const { gameNumber, blues, reds, greens } = getGameInfo(line);

	for (const num of blues) {
		if (num > 14) return;
	}
	for (const num of reds) {
		if (num > 12) return;
	}
	for (const num of greens) {
		if (num > 13) return;
	}
	sum += gameNumber;
});

// Wait for all of the lines to be read and processed
await once(rl, 'close');

console.log(sum);