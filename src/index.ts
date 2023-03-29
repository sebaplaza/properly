type Entry = Record<string, any>;
type Options = {
	parentPath: string;
	separator: string;
	leading: boolean;
};

function listProperties(obj: object, options: Partial<Options> = {}): Entry[] {
	if (!obj) return [];

	const entries = Object.entries(obj);
	const allKeys: Entry[] = [];

	const leading = options.leading ?? true;
	const separator = options.separator ? options.separator : ".";
	const prefix = options.parentPath
		? `${options.parentPath}${separator}`
		: leading
		? separator
		: "";

	for (let idx = 0; idx < entries.length; idx++) {
		const [key, value] = entries[idx];
		const path = `${prefix}${key}`;
		allKeys.push({ path, value });
		if (typeof value === "object") {
			const result = listProperties(value, {
				parentPath: path,
				separator,
				leading,
			});
			allKeys.push(...result);
		}
	}

	return allKeys;
}

export { listProperties };
