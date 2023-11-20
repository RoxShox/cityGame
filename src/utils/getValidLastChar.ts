export const getValidLastChar = (value: string): string => {
	const lastChar = value.split("").reverse()[0]

	if (lastChar === "ь" || lastChar === "ы") {
		return value.split("").reverse()[1]
	}
	return lastChar
}
