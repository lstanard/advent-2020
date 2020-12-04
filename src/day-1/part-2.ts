import input from "./input";

/**
 * Find the 3 entries that total 2020
 *
 * @param values
 * @param sum
 */
function findThreeEntries(values: number[], sum: number): number[] | null {
  if (!values?.length) {
    return null;
  }

  for (let i = 1; i < values.length; i++) {
    if (
      values[0] + values[i] < sum &&
      values[0] + values[i] + Math.min(...values) < sum
    ) {
      for (let j = i + 1; j < values.length - 1; j++) {
        if (values[0] + values[i] + values[j] === sum) {
          return [values[0], values[i], values[j]];
        }
      }
    }
  }

  return findThreeEntries(values.slice(1), sum);
}

console.time("findEntries");
const entries = findThreeEntries(input, 2020);
// console.log("entries", entries);
/**
 * findEntries: 3.001ms
 * findEntries: 3.047ms
 * findEntries: 2.95ms
 */
console.timeEnd("findEntries");
if (entries) {
  console.log(entries.reduce((a, b) => a * b));
}
