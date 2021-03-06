import input from "./input";
import { parseRulesInput, findParentBags } from "./part-1";
import { findTotalNestedBags } from "./part-2";

export const SAMPLE_INPUT = [
  "light red bags contain 1 bright white bag, 2 muted yellow bags.",
  "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
  "bright white bags contain 1 shiny gold bag.",
  "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
  "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
  "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
  "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
  "faded blue bags contain no other bags.",
  "dotted black bags contain no other bags.",
];

export const SAMPLE_INPUT_2 = [
  "shiny gold bags contain 2 dark red bags.",
  "dark red bags contain 2 dark orange bags.",
  "dark orange bags contain 2 dark yellow bags.",
  "dark yellow bags contain 2 dark green bags.",
  "dark green bags contain 2 dark blue bags.",
  "dark blue bags contain 2 dark violet bags.",
  "dark violet bags contain no other bags.",
];

describe("parseRulesInput", () => {
  it("should return the correct value for SAMPLE_INPUT", () => {
    expect(parseRulesInput(SAMPLE_INPUT)).toEqual({
      "light red": { "bright white": 1, "muted yellow": 2 },
      "dark orange": { "bright white": 3, "muted yellow": 4 },
      "bright white": { "shiny gold": 1 },
      "muted yellow": { "shiny gold": 2, "faded blue": 9 },
      "shiny gold": { "dark olive": 1, "vibrant plum": 2 },
      "dark olive": { "faded blue": 3, "dotted black": 4 },
      "vibrant plum": { "faded blue": 5, "dotted black": 6 },
      "faded blue": {},
      "dotted black": {},
    });
  });

  it("should return the correct value for SAMPLE_INPUT_2", () => {
    expect(parseRulesInput(SAMPLE_INPUT_2)).toEqual({
      "shiny gold": { "dark red": 2 },
      "dark red": { "dark orange": 2 },
      "dark orange": { "dark yellow": 2 },
      "dark yellow": { "dark green": 2 },
      "dark green": { "dark blue": 2 },
      "dark blue": { "dark violet": 2 },
      "dark violet": {},
    });
  });
});

describe("findParentBags", () => {
  it("should return the correct value for SAMPLE_INPUT", () => {
    expect(findParentBags(SAMPLE_INPUT, "shiny gold")).toEqual(4);
  });

  it("should return the correct value for input", () => {
    expect(findParentBags(input, "shiny gold")).toEqual(235);
  });
});

describe("findTotalNestedBags", () => {
  it("should return the correct value for SAMPLE_INPUT", () => {
    expect(findTotalNestedBags(SAMPLE_INPUT, "shiny gold")).toEqual(32);
  });

  it("should return the correct value for SAMPLE_INPUT_2", () => {
    expect(findTotalNestedBags(SAMPLE_INPUT_2, "shiny gold")).toEqual(126);
  });

  it("should return the correct value for input", () => {
    expect(findTotalNestedBags(input, "shiny gold")).toEqual(158493);
  });
});
