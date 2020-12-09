import input from "./input";

/**
 * Find the 2 entries that total 2020
 *
 * @param values
 * @param sum
 */
export function findTwoEntries(values: number[], sum: number): number[] | null {
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

export function multiplyValues(values: number[]) {
  return values.reduce((a, b) => a * b);
}

if (entries) {
  // console.log(multiplyValues(entries));
}
