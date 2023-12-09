import { once } from "node:events";
import { readline } from "../../utils/getInput.js";

let sum = 0;
const getSum = async (line) => {
	const sequences = [line.split(' ').map((n) => Number(n))];

	let lastSeq = sequences[sequences.length - 1];
	let nextSeq;
	while (lastSeq.some((num) => num !== 0)) {
		nextSeq = [];
		for (let i = 1; i < lastSeq.length; i++) {
			nextSeq.push(lastSeq[i] - lastSeq[i - 1]);
		}
		sequences.push(nextSeq);
		lastSeq = nextSeq;
	}

	for (let i = sequences.length - 2; i >= 0; i--) {
		sequences[i].push(sequences[i + 1][sequences[i + 1].length - 1] + sequences[i][sequences[i].length - 1]);
	}

	sum += sequences[0][sequences[0].length - 1];
};

// This reads each line of the input file asynchronously and waits until all of them have been read.
await once(readline('../../data/9.txt').on('line', getSum), 'close');

console.log(sum);
