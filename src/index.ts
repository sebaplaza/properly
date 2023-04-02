type PropertyEntry = {
	path: string;
	value: unknown;
};
type ListPropertiesOptions = {
	parentPath: string;
	separator: string;
	leading: boolean;
};

function listProperties(
	obj: object,
	options: Partial<ListPropertiesOptions>,
): PropertyEntry[] {
	// TODO we can improve performance x2 if we can find a way to fill an array in a more performance way
	// since array.push is not very efficient
	if (!obj) return [];

	const entries = Object.entries(obj);
	const allProperties: PropertyEntry[] = [];

	const leading = options?.leading ?? true;
	const separator = options?.separator ? options.separator : "/";
	const prefix = options?.parentPath
		? `${options.parentPath}${separator}`
		: leading
		? separator
		: "";

	// after perf test i found that we can win a little using a for instead of a forEach
	for (let idx = 0; idx < entries.length; idx++) {
		const [key, value] = entries[idx];
		const path = `${prefix}${key}`;
		allProperties.push({ path, value });
		if (typeof value === "object") {
			const result = listProperties(value, {
				parentPath: path,
				separator,
				leading,
			});
			allProperties.push(...result);
		}
	}

	return allProperties;
}

export { listProperties };
export type { PropertyEntry, ListPropertiesOptions };
