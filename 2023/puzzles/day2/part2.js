import { once } from "node:events";
import { readline } from "../../utils/getInput.js";

let getGameInfo = (line) => {
	return {
		blues: Math.max(1, ...[...line.matchAll(/([0-9]*)\sblue/g)].map((match) => Number(match[1]))),
		reds: Math.max(1, ...[...line.matchAll(/([0-9]*)\sred/g)].map((match) => Number(match[1]))),
		greens: Math.max(1, ...[...line.matchAll(/([0-9]*)\sgreen/g)].map((match) => Number(match[1])))
	};
};

let sum = 0;
const getSum = async (line) => {
	const { blues, reds, greens } = getGameInfo(line);

	sum += blues * reds * greens;
};

// This reads each line of the input file asynchronously and waits until all of them have been read.
await once(readline('../../data/puzzle_2.txt').on('line', getSum), 'close');

console.log(sum);
