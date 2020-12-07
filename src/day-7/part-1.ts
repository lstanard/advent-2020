export interface Rule {
  color: string;
  contains: {
    [key: string]: number;
  };
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
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const [color, contents] = line.split(" bags contain ");
    const rule: Rule = {
      color,
      contains: {},
    };
    if (!contents.includes("no other bags")) {
      const contentsRules = contents.split(/, /);
      for (let j = 0; j < contentsRules.length; j++) {
        const qty = contentsRules[j].slice(0, 1);
        const childColor = contentsRules[j].replace(/ bag(s*)(.*)/, "");
        rule["contains"][
          `${childColor.substring(2, childColor.length)}`
        ] = Number(qty);
      }
    }
    rules[color] = rule;
  }
  return rules;
}

export function findParentBags(input: string[], target: string): number {
  const rules: Rules = parseRulesInput(input);
  let results: Record<string, boolean> = {};
  function countTargetParentBags(rulesInput: Rules, targetColor: string) {
    Object.entries(rulesInput).forEach(([key, value]) => {
      if (key === targetColor || !Object.values(value.contains).length) {
        return;
      }
      if (
        value.contains.hasOwnProperty(targetColor) &&
        !results.hasOwnProperty(key)
      ) {
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
