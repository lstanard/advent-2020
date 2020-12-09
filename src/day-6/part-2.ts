import input from "./input";

import { getFormattedGroupedInput } from "../utils/getFormattedGroupedInput";

export function getGroupYesCountSum(input: string) {
  const groupedInput = getFormattedGroupedInput(input);
  const groupYesCount = groupedInput?.map((group) => {
    const passengers = group.split(" ");
    const counter: Record<string, Record<string, number>> = {};
    for (let i = 0; i < passengers.length; i++) {
      const answers = passengers[i];
      for (let j = 0; j < answers.length; j++) {
        const char = answers[j];
        if (counter[i] && counter[i][char]) {
          counter[i][char] += 1;
        } else if (counter[i] && !counter[i][char]) {
          counter[i][char] = 1;
        } else {
          counter[i] = {};
          counter[i][char] = 1;
        }
      }
    }
    if (Object.values(counter).length === 1) {
      return Object.values(counter[0]).length;
    } else {
      const charCounter: Record<string, number> = {};
      Object.values(counter).forEach((responses) => {
        Object.keys(responses).forEach((key) => {
          if (charCounter.hasOwnProperty(key)) {
            charCounter[key] += 1;
          } else {
            charCounter[key] = 0;
          }
        });
      });
      return Object.values(charCounter).filter((value) => {
        if (value > 0 && value === passengers.length - 1) {
          return value;
        }
      }).length;
    }
  });
  return groupYesCount?.reduce((a, b) => a + b);
}

/**
 * Takes between 36-40ms. Could probably be improved.
 */
// console.time("getGroupYesCountSum");
// console.log(getGroupYesCountSum(input));
// console.timeEnd("getGroupYesCountSum");
