import { readfile } from "../../utils/getInput.js";

const cards = new Map();

const getSum = (input) => {
	let sum = 0;

	for (let i = 0; i < input.length; i++) {
		const [id, winners, guesses] = input[i].match(/Card\s+(\d*):\s([\d\s]+)\s\|\s([\d\s]+)/).slice(1, 4).map((str) => str.match(/([0-9]+)/g)).map(a => a.length === 1 ? Number(a[0]) : a.map(num => Number(num)));

		const card = addCard(id);

		let matches = 0;
		for (let i = 0; i < guesses.length; i++) {
			if (winners.includes(guesses[i])) matches++;
		}

		card.wins = matches;

		addWins(card);
	}

	sum = Array.from(cards.values()).reduce((sum, card) => sum += card.instances, sum);

	console.log(sum);
};

const addCard = (id) => {
	let card = cards.get(id);

	if (!card) {
		card = {
			number: id,
			instances: 1,
			wins: undefined,
		};
		cards.set(id, card);
	} else {
		card.instances += 1;
	}

	return card;
};

const addWins = (card) => {
	for (let i = 0; i < card.instances; i++) {
		for (let w = 1; w <= card.wins; w++) {
			addCard(card.number + w);
		}
	}
};

// This gets the input file and splits it into lines
getSum((await readfile('../../data/puzzle_4.txt')).split('\n'));