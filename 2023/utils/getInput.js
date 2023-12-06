import { createReadStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';

/**
 * Returns an event emitter that reads data in a file line by line (see https://nodejs.org/docs/latest-v20.x/api/readline.html#readline)
 * @param {string} filepath
 * @returns
 */
export const readline = (filepath) => {
	const fileStream = createReadStream(filepath);
	return createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
};

/**
 * Returns a promise that resolves to the contents of a file as text
 * @param {string} filepath
 * @returns
 */
export const readfile = async (filepath) => await readFile(filepath, { encoding: 'utf-8' });