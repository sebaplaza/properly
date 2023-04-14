function set(
	obj: object,
	path: string | string[],
	value: unknown,
	separator = "\\"
) {
	const properties = Array.isArray(path) ? path : path.split(separator);

	const lastKeyIndex = properties.length - 1;
	for (let i = 0; i < lastKeyIndex; ++i) {
		const key = properties[i];
		if (!(key in obj)) {
			obj[key] = {};
		}
		obj = obj[key];
	}
	obj[properties[lastKeyIndex]] = value;
}

export { set };
