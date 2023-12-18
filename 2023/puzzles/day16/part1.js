import { EOL } from 'node:os';

import { readfile } from '../../utils/getInput.js';

let contraption = (await readfile('../../data/16.txt')).split(EOL);
let sum = 0;

const oppositeDir = {
	up: 'down',
	down: 'up',
	left: 'right',
	right: 'left'
};

class Tile {
	energized = false;
	visits = [];
	constructor([r, c], symbol) {
		this.r = Number(r);
		this.c = Number(c);
		this.symbol = symbol;
		this.id = Tile.idFromCoords(r, c);
	}
	static idFromCoords (r, c) {
		return `${r.toString().padStart(3, '0')}${c.toString().padStart(3, '0')}`;
	}
	neighbor (direction) {
		return {
			up: graph.get(Tile.idFromCoords(this.r - 1, this.c)),
			down: graph.get(Tile.idFromCoords(this.r + 1, this.c)),
			left: graph.get(Tile.idFromCoords(this.r, this.c - 1)),
			right: graph.get(Tile.idFromCoords(this.r, this.c + 1))
		}[direction];
	}
	sendLaserTo (from) {
		const neighbors = {
			'|': () => ({ // left-down mirror
				up: ['down'],
				down: ['up'],
				left: ['down', 'up'],
				right: ['down', 'up'],
			}[from]), // up-down splitter
			'-': () => ({ // left-down mirror
				up: ['right', 'left'],
				down: ['right', 'left'],
				left: ['right'],
				right: ['left'],
			}[from]), // left-right splitter
			'\\': () => ({ // left-down mirror
				up: ['right'],
				down: ['left'],
				left: ['down'],
				right: ['up']
			}[from]),
			'/': () => ({ // left-up mirror
				up: ['left'],
				down: ['right'],
				left: ['up'],
				right: ['down']
			}[from]),
			'.': () => ({ // empty space, has an edge opposite from where the laser comes into it
				up: ['down'],
				down: ['up'],
				left: ['right'],
				right: ['left']
			}[from])
		}[this.symbol]();

		return neighbors;
	}
}

const graph = new Map(contraption.flatMap((row, r) => {
	const nodes = [];
	for (const c in row) {
		nodes.push([Tile.idFromCoords(r, c), new Tile([r, c], row[c])]);
	}
	return nodes;
}));


const queue = [['left', graph.get(Tile.idFromCoords(0, 0))]];

while (queue.length > 0) {
	const [from, tile] = queue.shift();
	tile.energized = true;

	tile.sendLaserTo(from).forEach(dir => {
		const node = tile.neighbor(dir);
		if (node !== undefined && !node.visits.includes(oppositeDir[dir])) {
			node.visits.push(oppositeDir[dir]);
			queue.push([oppositeDir[dir], node]);
		}
	});
}

[...graph.values()].forEach(tile => {
	if (tile.energized) sum++;
});

console.log(sum);
