import { findTwoEntries } from "../day-1/part-1";

/**
 * Solution for Part 1
 */
export function findNumberWithoutSum(
  numbers: number[],
  preambleLength = 25
): number {
  let result = 0;
  numbers.forEach((value, index) => {
    if (numbers[index + preambleLength]) {
      if (
        findTwoEntries(
          [...numbers].slice(index, index + preambleLength),
          numbers[index + preambleLength]
        )?.length !== 2
      ) {
        result = numbers[index + preambleLength];
      }
    }
  });
  return result;
}
