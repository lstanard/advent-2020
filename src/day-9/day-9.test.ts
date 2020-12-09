import input from "./input";
import sampleInput from "./sample-input";

import { findNumberWithoutSum } from "./part-1";

describe("findNumberWithoutSum", () => {
  it("should return the correct value for sampleInput", () => {
    expect(findNumberWithoutSum(sampleInput, 5)).toEqual(127);
  });

  it("should return the correct value for input", () => {
    expect(findNumberWithoutSum(input)).toEqual(507622668);
  });
});
