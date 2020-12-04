import input from "./input";

/**
 * Find the 2 entries that total 2020
 *
 * @param values
 * @param sum
 */
function findTwoEntries(values: number[], sum: number): number[] | null {
  if (!values?.length) {
    return null;
  }

  for (let i = 1; i < values.length; i++) {
    if (values[0] + values[i] === sum) {
      return [values[0], values[i]];
    }
  }

  return findTwoEntries(values.slice(1), sum);
}
const entries = findTwoEntries(input, 2020);
console.log("entries", entries);
if (entries) {
  console.log(entries.reduce((a, b) => a * b));
}
