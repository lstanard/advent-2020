import { getFormattedGroupedInput } from "../utils/getFormattedGroupedInput";

export function getYesCountSum(input: string) {
  const groupedInput = getFormattedGroupedInput(input);
  const uniqueAnswers = groupedInput?.map((group) => {
    const counter: Record<string, number> = {};
    const values = group.split(" ").join("");
    for (let i = 0; i < values.length; i++) {
      const character = values[i];
      if (counter[character]) {
        counter[character] += 1;
      } else {
        counter[character] = 1;
      }
    }
    return Object.keys(counter).length;
  });
  return uniqueAnswers?.reduce((a, b) => a + b);
}
