import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline/promises';

export const readline = (filepath) => {
	const fileStream = createReadStream(filepath);
	return createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
};
