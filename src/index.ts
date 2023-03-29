type Entry = Record<string, any>;
type Options = {
	parentPath: string;
	separator: string;
	leading: boolean;
};

function listProperties(obj: object, options?: Partial<Options>): Entry[] {
	const allKeys: Entry[] = [];

	if (!obj) return [];

	const entries = Object.entries(obj);

	const leading = options?.leading ?? true;
	const separator = options?.separator ? options.separator : ".";
	const prefix = options?.parentPath
		? `${options.parentPath}${separator}`
		: leading
		? separator
		: "";

	for (const [key, value] of entries) {
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
