export function findAdapterDifferences(input: number[]) {
  const results: Record<number, number> = {};
  const sorted = input.sort((a, b) => a - b);
  sorted.unshift(0);
  sorted.forEach((value, index) => {
    const diff = sorted[index + 1] ? sorted[index + 1] - value : 3;
    if (results.hasOwnProperty(diff)) {
      results[diff] += 1;
    } else {
      results[diff] = 1;
    }
  });
  return Object.values(results).reduce((a, b) => a * b);
}
