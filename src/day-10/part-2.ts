import input from "./input";

import { getAllSortedAdapters } from "./part-1";

export function findTotalCombinations(input: number[]) {
  const adapters = getAllSortedAdapters(input);
  const results: Record<string, boolean> = {};

  function getResultsSets(
    numbers: number[],
    end: number,
    currentSet: number[]
  ) {
    if (!currentSet.length) {
      currentSet.push(numbers[0]);
      numbers.slice(0, 1);
      getResultsSets(numbers, end, currentSet);
    } else if (currentSet[currentSet.length - 1] === end) {
      results[currentSet.toString()] = true;
    } else if (numbers.length) {
      const prev =
        currentSet.length > 1
          ? currentSet[currentSet.length - 1]
          : currentSet[0];

      for (let i = 1; i <= 3; i++) {
        if (numbers.includes(prev + i)) {
          const nextSet = [...currentSet];
          nextSet.push(prev + i);
          numbers.slice(0, numbers.indexOf(prev + i));
          getResultsSets(numbers, end, nextSet);
        }
      }
    }
  }
  getResultsSets(adapters, adapters[adapters.length - 1], []);

  return Object.values(results).length;
}

// console.time("findTotalCombinations");
// console.log(findTotalCombinations(input));
// console.timeEnd("findTotalCombinations");
