import { EOL } from 'os';
import { readfile } from "../../utils/getInput.js";

let [directions, _, ...nodeStrings] = (await readfile('../../data/8.txt')).split(EOL);

const nodes = nodeStrings.reduce((nodes, str) => {
	const match = Array.from(str.matchAll(/(?<node>\w+).*\((?<left>\w+),\s(?<right>\w+)\)/g))[0];
	nodes[match.groups.node] = {
		L: match.groups.left,
		R: match.groups.right
	};
	if (match.groups.node.endsWith('A')) nodes.endInA.push(match.groups.node);
	return nodes;
}, { endInA: [] });

let count = 0;
const counts = [];
let nextNodes = nodes.endInA;
let i = 0;
let dir = null;
while (nextNodes.length > 0) {
	count++;
	dir = directions[i++];
	if (i === directions.length) i = 0;
	for (let n = 0; n < nextNodes.length; n++) {
		nextNodes.unshift(nodes[nextNodes.pop()][dir]);
	}
	nextNodes = nextNodes.filter((node) => {
		if (node.endsWith('Z')) {
			counts.push(count);
			return false;
		}
		return true;
	});
}

function getPrimeFactors (number) {
	const factors = [];
	let divisor = 2;

	while (number >= 2) {
		if (number % divisor == 0) {
			factors.push(divisor);
			number /= divisor;
		} else {
			divisor++;
		}
	}
	return factors;
}

const primeFactors = new Set();
counts.forEach((count) => getPrimeFactors(count).forEach((pf) => primeFactors.add(pf)));
console.log(Array.from(primeFactors).reduce((product, pf) => product * pf, 1));
