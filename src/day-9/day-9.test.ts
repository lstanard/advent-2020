import input from "./input";
import sampleInput from "./sample-input";

import { findNumberWithoutSum } from "./part-1";
import { findContiguousSubsetAndSum } from "./part-2";

describe("findNumberWithoutSum", () => {
  it("should return the correct value for sampleInput", () => {
    expect(findNumberWithoutSum(sampleInput, 5)).toEqual(127);
  });

  it("should return the correct value for input", () => {
    expect(findNumberWithoutSum(input)).toEqual(507622668);
  });
});

describe("findContiguousSubsetAndSum", () => {
  it("should return the correct value for sampleInput", () => {
    expect(findContiguousSubsetAndSum(sampleInput, 5)).toEqual(62);
  });

  it("should return the correct value for input", () => {
    expect(findContiguousSubsetAndSum(input)).toEqual(76688505);
  });
});
