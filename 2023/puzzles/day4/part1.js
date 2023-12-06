import { once } from "node:events";
import { readline } from "../../utils/getInput.js";

let sum = 0;
const getSum = (line) => {
	// Forms the input line into an array of winning numbers and guessed numbers
	const [winners, guesses] = line.match(/[0-9\s]+\|[0-9\s]+/)[0].split('|').map((str) => str.match(/([0-9]+)/g));

	let matches = guesses.reduce(
		(sum, guess) => winners.includes(guess) ? sum + 1 : sum,
		0
	);

	sum += matches > 0 ? Math.pow(2, matches - 1) : 0;
};

// This reads each line of the input file asynchronously and waits until all of them have been read.
await once(readline('../../data/4.txt').on('line', getSum), 'close');

console.log(sum);