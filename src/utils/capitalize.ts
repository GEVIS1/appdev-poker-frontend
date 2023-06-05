/**
 * Capitalize the first letter in the input string.
 * @param str String to capitalize.
 * @returns The capitalized version of the input string.
 */
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export default capitalize;
