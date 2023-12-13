import { EOL, type } from 'os';
import { readfile } from "../../utils/getInput.js";

let grid = [...(await readfile('../../data/10.txt')).split(EOL)];
const HEIGHT = grid.length;
const WIDTH = grid[0].length;

class Node {
	r;
	c;
	type;
	constructor(r, c, type) {
		this.id = r.padStart(3, '0') + c.padStart(3, '0');
		this.r = Number(r);
		this.c = Number(c);
		this.type = type;
	}
	edge (direction) {
		return {
			north: this.r > 0 ? (this.r - 1).toString().padStart(3, '0') + this.c.toString().padStart(3, '0') : undefined,
			south: this.r < HEIGHT ? (this.r + 1).toString().padStart(3, '0') + this.c.toString().padStart(3, '0') : undefined,
			east: this.c < WIDTH ? this.r.toString().padStart(3, '0') + (this.c + 1).toString().padStart(3, '0') : undefined,
			west: this.c > 0 ? this.r.toString().padStart(3, '0') + (this.c - 1).toString().padStart(3, '0') : undefined
		}[direction];
	}
	edges () {
		const edges = {
			'.': () => ({}), // is ground; there is no pipe in this tile.
			'|': () => ({ north: this.edge('north'), south: this.edge('south') }), // is a vertical pipe connecting north and south
			'-': () => ({ east: this.edge('east'), west: this.edge('west') }), // is a horizontal pipe connecting east and west
			'L': () => ({ north: this.edge('north'), east: this.edge('east') }), // is a 90-degree bend connecting north and east
			'J': () => ({ north: this.edge('north'), west: this.edge('west') }), // is a 90-degree bend connecting north and west
			'7': () => ({ south: this.edge('south'), west: this.edge('west') }), // is a 90-degree bend connecting south and west
			'F': () => ({ south: this.edge('south'), east: this.edge('east') }), // is a 90-degree bend connecting south and east
			'S': () => { // is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
				const edges = {};
				const surroundingNodes = ['north', 'south', 'east', 'west'].map(dir => this.edge(dir));
				if (surroundingNodes[0] !== undefined && ['|', '7', 'F'].includes(nodes.get(surroundingNodes[0]).type)) edges.north = surroundingNodes[0];
				if (surroundingNodes[1] !== undefined && ['|', 'L', 'J'].includes(nodes.get(surroundingNodes[1]).type)) edges.south = surroundingNodes[1];
				if (surroundingNodes[2] !== undefined && ['-', '7', 'J'].includes(nodes.get(surroundingNodes[2]).type)) edges.east = surroundingNodes[2];
				if (surroundingNodes[3] !== undefined && ['-', 'F', 'L'].includes(nodes.get(surroundingNodes[3]).type)) edges.west = surroundingNodes[3];

				return edges;
			}
		}[this.type]();

		return edges;
	}
}

const nodes = new Map();
for (const r in grid) {
	for (const c in grid[r]) {
		const node = new Node(r, c, grid[r][c]);
		nodes.set(r.padStart(3, '0') + c.padStart(3, '0'), node);
		if (grid[r][c] === 'S') {
			nodes.set('start', node);
		};
	}
}

function moveToNextNode (currentNode, goingTo) {
	const comingFrom = {
		north: 'south',
		south: 'north',
		east: 'west',
		west: 'east',
	}[goingTo];

	let dir, nextNode;
	try {
		const edges = Object.entries(currentNode.edges());
		[dir, nextNode] = edges.filter(([dir, node]) => dir !== comingFrom)[0];
	} catch (e) {
		console.error('Current Node: ', currentNode);
		console.error(e);
	}

	// console.log(`Current Node -> ${currentNode.type}: ${currentNode.id}
	// To -> ${dir}`);

	// console.log(`   Next Node -> ${nextNode}
	// From -> ${comingFrom}`);

	return [nodes.get(nextNode), dir];
};

let currentNode = nodes.get('start');
let [goingTo, _] = Object.entries(currentNode.edges())[0]; // Pick the first edge for the start node
let count = 0;
do {
	[currentNode, goingTo] = moveToNextNode(currentNode, goingTo);
	count++;
} while (currentNode.type !== 'S');

console.log(count / 2);
