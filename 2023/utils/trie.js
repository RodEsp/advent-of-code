export default function Trie (array) {
	this.nodes = {};

	if (array) {
		for (const word of array) {
			this.insert(word);
		}
	}
};

/** 
 * Inserts a string into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
	let chars = word.split('');
	let { depth, nodes } = this.drillDown(chars);

	// We found the entire word so no need to insert anything...
	if (depth === chars.length) {
		nodes.terminator = true;
		return;
	}

	for (depth; depth < chars.length; depth++) {
		const char = chars[depth];
		nodes[char] = {};
		nodes = nodes[char];
		if (depth === chars.length - 1) {
			nodes.terminator = true;
		}
	}
};

/** 
 * Returns true if the word is in the trie and false otherwise.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.contains = function (word) {
	let chars = word.split('');
	const { depth, nodes } = this.drillDown(chars);

	if (depth === chars.length && nodes.terminator) return true;
	return false;
};

/** 
 * Returns true if there is a previously inserted word that has the specified prefix, and false otherwise.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
	let chars = prefix.split('');
	const { depth, nodes } = this.drillDown(chars);

	if (depth === chars.length) return true;
	return false;
};

/**
 * @param {char[]} sequence
 * @return {{depth: number, nodes: object}}
 */
Trie.prototype.drillDown = function (sequence) {
	let nodes = this.nodes;
	let i = 0;
	let char = sequence[i];
	while (nodes[char] !== undefined) {
		nodes = nodes[char];
		i++;
		char = sequence[i];
	}

	return {
		depth: i,
		nodes
	};
};
