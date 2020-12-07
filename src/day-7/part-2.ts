import { Rules, parseRulesInput } from "./part-1";

/**
 * Gets solution for Part 2 - find the total number of bags contained
 * within the target bag, and all nested bags contained within.
 *
 * @param input
 * @param target
 */
export function findTotalNestedBags(input: string[], target: string): number {
  const rules: Rules = parseRulesInput(input);
  function getNestedBags(
    rulesInput: Rules,
    targetColor: string,
    qty?: number,
    total: number = 0
  ): number {
    Object.entries(rulesInput).forEach(([key, value]) => {
      if (key === targetColor) {
        if (Object.values(value.contains).length) {
          // rule has children
          Object.entries(value.contains).forEach(([childKey, childValue]) => {
            total =
              total +
              (childValue +
                childValue *
                  getNestedBags(rulesInput, childKey, childValue, total));
          });
        } else if (qty) {
          // rule has no children, want to just return the quantity
          total = total * qty;
        }
      }
    });
    return total;
  }
  const totalBags = getNestedBags(rules, target);
  console.log("totalBags", Number(totalBags).toFixed(1));
  return totalBags;
}
