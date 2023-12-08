import { EOL } from 'os';
import { readfile } from "../../utils/getInput.js";

let [directions, _, ...nodeStrings] = (await readfile('../../data/8.txt')).split(EOL);

const nodes = nodeStrings.reduce((nodes, str) => {
	const match = Array.from(str.matchAll(/(?<node>\w+).*\((?<left>\w+),\s(?<right>\w+)\)/g))[0];
	nodes[match.groups.node] = {
		L: match.groups.left,
		R: match.groups.right
	};
	return nodes;
}, {});

let count = 0;
let reachedZZZ = false;
let node = nodes.AAA;
let i = 0;
let dir = null;
while (!reachedZZZ) {
	count++;
	dir = directions[i++];
	if (i === directions.length) i = 0;
	if (node[dir] === 'ZZZ') reachedZZZ = true;
	node = nodes[node[dir]];
}

console.log(count);
