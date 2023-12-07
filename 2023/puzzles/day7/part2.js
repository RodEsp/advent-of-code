import { readfile } from "../../utils/getInput.js";

// Start type defs

/**
 * @typedef { ('A'|'K'|'Q'|'J'|'T'|'9'|'8'|'7'|'6'|'5'|'4'|'3'|'2') } card
 */
/**
 * @typedef { string } cards
 * @pattern "[AKQJT98765432]{5}"
 */
/**
 * @typedef { Object } hand
 * @property { cards } cards
 * @property { number } bid
 * @property { number } [type]
 */

/**
 * @enum { number }
 */
const handTypes = {
	FIVE_OF_A_KIND: 1,
	FOUR_OF_A_KIND: 2,
	FULL_HOUSE: 3,
	THREE_OF_A_KIND: 4,
	TWO_PAIR: 5,
	ONE_PAIR: 6,
	HIGH_CARD: 7
};

/**
 * @type { Object<card, number> }
 */
const cardRank = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reduce((ranks, card, i) => { ranks[card] = i; return ranks; }, {});

// End type defs

/**
 * @param { Object<card, number> } counts
 */
const transformJokers = (counts) => {
	let max = 0;
	let most = '';


	Object.entries(counts).forEach(([card, count]) => {
		if (count > max && card !== 'J') {
			max = count;
			most = card;
		}
	});

	counts[most] += counts.J;
	delete counts.J;
};

/**
 * @param { hand[] } hands 
 */
const typeHands = (hands) => {
	for (let i = 0; i < hands.length; i++) {
		const hand = hands[i];
		const counts = {};

		let c = hand.cards.length;
		while (c--) {
			if (counts[hand.cards[c]]) counts[hand.cards[c]]++;
			else counts[hand.cards[c]] = 1;
		}

		if (counts.J && counts.J !== 5) {
			transformJokers(counts);
		}

		hand.type = {
			5: () => handTypes.HIGH_CARD,
			4: () => handTypes.ONE_PAIR,
			3: (counts) => {
				if (counts.every(count => [3, 1, 1].includes(count))) return handTypes.THREE_OF_A_KIND;
				else if (counts.every(count => [2, 2, 1].includes(count))) return handTypes.TWO_PAIR;
			},
			2: (counts) => {
				if (counts.every(count => [1, 4].includes(count))) return handTypes.FOUR_OF_A_KIND;
				else if (counts.every(count => [2, 3].includes(count))) return handTypes.FULL_HOUSE;
			},
			1: () => handTypes.FIVE_OF_A_KIND
		}[Object.keys(counts).length](Object.values(counts));
	}
};

/**
 * @param { hand[] } hands 
 */
const rankHands = (hands) => {
	hands.sort((h1, h2) => {
		if (h1.type === h2.type) {
			for (let i = 0; i < h1.cards.length; i++) {
				if (cardRank[h1.cards[i]] < cardRank[h2.cards[i]]) return 1;
				if (cardRank[h1.cards[i]] > cardRank[h2.cards[i]]) return -1;
			}
		}
		return h2.type - h1.type;
	});
};

/**
 * @type { hand[] }
 */
const hands = Array.from((await readfile('../../data/7.txt')).matchAll(/(?<cards>[\d\w]+)\s(?<bid>\d+)/g)).map((match) => ({
	cards: match.groups.cards,
	bid: Number(match.groups.bid)
}));

typeHands(hands);
rankHands(hands);
const score = hands.reduce((sum, hand, i) => sum += hand.bid * (i + 1), 0);
console.log(score);
