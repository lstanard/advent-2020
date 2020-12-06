import input from "./input";
import { getYesCountSum } from "./part-1";

export const SAMPLE_INPUT = `abc

a
b
c

ab
ac

a
a
a
a

b`;

describe("getYesCountSum", () => {
  it("should return the correct value for SAMPLE_INPUT", () => {
    expect(getYesCountSum(SAMPLE_INPUT)).toEqual(11);
  });

  it("should return the correct value for input", () => {
    expect(getYesCountSum(input)).toEqual(6735);
  });
});
