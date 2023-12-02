import { once } from "node:events";
import { readline } from "../../utils/getInput.js";

let getGameInfo = (line) => {
	return {
		gameNumber: Number(line.match(/Game\s([0-9]*)/)[1]),
		reds: Math.max(...[...line.matchAll(/([0-9]*)\sred/g)].map((match) => Number(match[1]))),
		greens: Math.max(...[...line.matchAll(/([0-9]*)\sgreen/g)].map((match) => Number(match[1]))),
		blues: Math.max(...[...line.matchAll(/([0-9]*)\sblue/g)].map((match) => Number(match[1]))),
	};
};

let sum = 0;
const getSum = async (line) => {
	const { gameNumber, reds, greens, blues } = getGameInfo(line);

	if (reds > 12 || greens > 13 || blues > 14) return;
	sum += gameNumber;
};

// This reads each line of the input file asynchronously and waits until all of them have been read.
await once(readline('../../data/puzzle_2.txt').on('line', getSum), 'close');

console.log(sum);
