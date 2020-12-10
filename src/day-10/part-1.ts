/**
 * Utility function to sort numbers and add 0 to the start,
 * largest + 3 to the end.
 *
 * @param input
 */
export function getAllSortedAdapters(input: number[]): number[] {
  const sorted = input.sort((a, b) => a - b);
  sorted.unshift(0);
  sorted.push(Math.max(...sorted) + 3);
  return sorted;
}

/**
 * Solution for Part 1
 *
 * @param input
 */
export function findAdapterDifferences(input: number[]) {
  const results: Record<number, number> = {};
  const sorted = getAllSortedAdapters(input);
  sorted.forEach((value, index) => {
    const diff = sorted[index + 1] - value;
    if (results.hasOwnProperty(diff)) {
      results[diff] += 1;
    } else {
      results[diff] = 1;
    }
  });
  return Object.values(results).reduce((a, b) => a * b);
}
