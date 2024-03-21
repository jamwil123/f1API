/**
 * Converts a snake_case string to a human-readable string with the first letter of each word in uppercase.
 * @param {string} name - The snake_case string to be converted.
 * @returns {string} A human-readable string with the first letter of each word in uppercase.
 */
export const formatSnakeCaseToTitleCase = (string: string) => {
  if (!string || undefined) return undefined;
  return string
    .toLowerCase()
    .split("_")
    .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
    .join(" ");
};

/**
 * Converts a hyphen-separated string to camelCase.
 * @param {string} input - The hyphen-separated string to be converted.
 * @returns {string} A camelCase version of the input string.
 */
export function hyphenToCamelCase(input: string): string {
  return input.replace(/-+(\w)/g, (_, group) => group.toUpperCase());
}

/**
 * Converts a strings first character to uppercase
 * @param {string} input - The string to be converted.
 * @returns {string} A string with the first letter capitalised.
 */
export const formatFirstCharToUppercase = (string: string) => {
  if (!string) return undefined;
  return string.charAt(0).toUpperCase() + string.slice(1);
};
