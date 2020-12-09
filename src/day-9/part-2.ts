import { findNumberWithoutSum } from "./part-1";

/**
 * Solution for Part 2 -
 * Find a contiguous set of at least two numbers in your list which sum to the
 * invalid number provided by findNumberWithoutSum, then return the sum of the
 * smallest and largest numbers from that range.
 *
 * @param numbers
 * @param preambleLength
 */
export function findContiguousSubsetAndSum(
  numbers: number[],
  preambleLength = 25
): number {
  const targetValue = findNumberWithoutSum(numbers, preambleLength);
  let resultSet: number[] = [];
  loop1: for (let i = 0; i < numbers.length; i++) {
    if (
      numbers[i] >= targetValue ||
      numbers[i] + numbers[i + 1] > targetValue
    ) {
      break;
    }
    for (let j = i + 2; j < numbers.length; j++) {
      const set = [...numbers].slice(i, j);
      if (set.length) {
        const sum = set.reduce((a, b) => a + b);
        if (sum > targetValue) {
          break;
        } else {
          if (sum === targetValue) {
            resultSet = set;
            break loop1;
          }
        }
      }
    }
  }
  return Math.min(...resultSet) + Math.max(...resultSet);
}

/**
 * Executes in ~152ms, not as bad as I thought it might be,
 * but I could shave some time off for sure.
 */
// console.time("findContiguousSubsetAndSum");
// console.log(findContiguousSubsetAndSum(input));
// console.timeEnd("findContiguousSubsetAndSum");
