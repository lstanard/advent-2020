import { parseRulesInput, Rules } from "./part-1";

/**
 * Gets solution for Part 2 - find the total number of bags contained
 * within the target bag, and all nested bags contained within.
 *
 * @param input
 * @param target
 */
export function findTotalNestedBags(input: string[], target: string): number {
  /**
   * NOTE: This could be improved, I could pass the already parsed results,
   * instead of calling parseRulesInput every time. Being a little lazy.
   */
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
