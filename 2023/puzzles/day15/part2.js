import { memoize } from '../../utils/functions.js';
import { readfile } from '../../utils/getInput.js';

/**
 * @typedef { Object } step
 * @property { string } label
 * @property { ('=' | '-') } instruction
 * @property { (undefined | number) } focalLength
 */
/**
 * @type { step[] }
 */
let initSequence = [...(await readfile('../../data/15.txt')).matchAll(/(?<label>[a-z]+)(?<instruction>=|-)(?<focalLength>[1-9])*/g)]
	.map(match => ({ label: match.groups.label, instruction: match.groups.instruction, focalLength: match.groups.focalLength }));

function hash (str) {
	let hash = 0;

	for (const c of str) {
		hash += c.charCodeAt(0);
		hash *= 17;
		hash %= 256;
	}

	return hash;
}
const mhash = memoize(hash);

class Box {
	constructor(id) {
		this.id = id;
	}
	lensSlots = new Map();
	hasLenses () { return this.lensSlots.size > 0; }
	addLens (label, focalLength) {
		this.lensSlots.set(label, focalLength);
	}
	removeLens (label) {
		this.lensSlots.delete(label);
	}
}

/**
 * @param { step[] } steps 
 * @returns { Map<number, Box> }
 */
function addLensesToBoxes (steps) {
	const boxes = new Map([...Array(256).keys()].map((_, i) => {
		return [i, new Box(i)];
	}));

	steps.forEach((step) => {
		const box = mhash(step.label);

		if (step.instruction === '=') {
			boxes.get(box)?.addLens(step.label, step.focalLength);
		} else {
			boxes.get(box)?.removeLens(step.label);
		}
	});

	return boxes;
}

const boxes = addLensesToBoxes(initSequence);
let focusingPower = 0;
for (const box of boxes.values()) {
	if (box.hasLenses()) {
		[...box.lensSlots.values()].forEach((focalLength, i) => {
			focusingPower += (box.id + 1) * (i + 1) * focalLength;
		});
	}
}

console.log(focusingPower);
