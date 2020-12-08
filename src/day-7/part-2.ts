import { parseRulesInput, Rules } from "./part-1";

/**
 * Gets solution for Part 2 - find the total number of bags contained
 * within the target bag, and all nested bags contained within.
 *
 * @param input
 * @param target
 */
export function findTotalNestedBags(input: string[], target: string): number {
  const rules: Rules = parseRulesInput(input);
  let total = 0;

  const nested = rules[target];
  if (Object.values(nested).length) {
    Object.entries(nested).forEach(([childColor, childQty]) => {
      total += childQty;
      let subCount = findTotalNestedBags(input, childColor);
      if (subCount) {
        subCount = subCount * childQty;
        total += subCount;
      }
    });
  }

  return total;
}
