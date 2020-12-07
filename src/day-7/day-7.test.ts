import input from "./input";
import { findParentBags } from "./part-1";

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

describe("findParentBags", () => {
  it("should return the correct value for SAMPLE_INPUT", () => {
    expect(findParentBags(SAMPLE_INPUT, "shiny gold")).toEqual(4);
  });

  it("should return the correct value for input", () => {
    expect(findParentBags(input, "shiny gold")).toEqual(4);
  });
});
