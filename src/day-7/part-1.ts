export interface Rule {
  [key: string]: number;
}

export interface Rules {
  [key: string]: Rule;
}

/**
 * Utility for parsing the rules (input) and creating a table of
 * rules for each entry.
 *
 * @param input array of rules
 */
export function parseRulesInput(input: string[]): Rules {
  const rules: Rules = {};
  input.forEach((rule) => {
    const [color, contents] = rule.split(" bags contain ");
    const nestedBags = contents.split(/, /);
    rules[color] = {};
    nestedBags.forEach((bag) => {
      const qty = bag.slice(0, 1).match(/\d/) ? bag.slice(0, 1) : 0;
      let childColor = bag.replace(/ bag(s*)(.*)/, "");
      if (childColor.indexOf("no other") > -1) {
        rules[color] = {};
      } else {
        childColor = childColor.substring(2, childColor.length);
        rules[color][childColor] = Number(qty);
      }
    });
  });
  return rules;
}

/**
 * Gets solution for Part 1 - total number of parent bags that could
 * contain the given 'target' bag color
 *
 * @param input
 * @param target
 */
export function findParentBags(input: string[], target: string): number {
  const rules: Rules = parseRulesInput(input);
  let results: Record<string, boolean> = {};
  function countTargetParentBags(rulesInput: Rules, targetColor: string) {
    Object.entries(rulesInput).forEach(([key, value]) => {
      if (key === targetColor || !Object.values(value).length) {
        return;
      }
      if (value.hasOwnProperty(targetColor) && !results.hasOwnProperty(key)) {
        results[key] = true;
        countTargetParentBags(rulesInput, key);
      }
    });
  }
  countTargetParentBags(rules, target);
  return Object.values(results).length;
}

/**
 * Takes ~72-73ms to execute
 */
// console.time("findParentBags");
// findParentBags(input, "shiny gold");
// console.timeEnd("findParentBags");
