import { readfile } from "../../utils/getInput.js";

const cards = new Map();

const addWins = (card) => {
	for (let i = 0; i < card.instances; i++) {
		for (let w = 1; w <= card.wins; w++) {
			let c = cards.get(card.number + w);

			if (!c) {
				c = {
					number: card.number + w,
					instances: 1,
					wins: undefined,
				};
				cards.set(card.number + w, c);
			} else {
				c.instances += 1;
			}
		}
	}
};

const getSum = (input) => {
	let sum = 0;

	for (let i = 0; i < input.length; i++) {
		const [cardNumber, winners, guesses] = input[i].match(/Card\s+(\d*):\s([\d\s]+)\s\|\s([\d\s]+)/).slice(1, 4).map((str) => str.match(/([0-9]+)/g)).map(a => a.length === 1 ? Number(a[0]) : a.map(num => Number(num)));
		let card = cards.get(cardNumber);

		if (!card) {
			card = {
				number: cardNumber,
				instances: 1,
				wins: undefined,
			};
			cards.set(cardNumber, card);
		} else {
			card.instances += 1;
		}

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

// This gets the input file and splits it into lines
getSum((await readfile('../../data/puzzle_4.txt')).split('\n'));