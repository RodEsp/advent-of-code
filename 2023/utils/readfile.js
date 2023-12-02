import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline/promises';

export const rline = (filepath) => {
	const fileStream = createReadStream(filepath);
	return createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
};

