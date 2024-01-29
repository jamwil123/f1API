// Sanitises a param variable with an underscore to a string with all words capitalize... Example: alfa_romeo -> Alfa Romeo

export const changeStringToUpperCaseFirstCharOnly = (name: string) => {
  return name
    .toLowerCase()
    .split("_")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
};

export function hyphenToCamelCase(input: string): string {
  return input.replace(/-+(\w)/g, (_, group) => group.toUpperCase());
}
