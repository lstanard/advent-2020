import input from "./input";
import sampleInput1 from "./sample-input-1";
import sampleInput2 from "./sample-input-2";
import { findAdapterDifferences } from "./part-1";
import { findTotalCombinations } from "./part-2";

describe("findAdapterDifferences", () => {
  it("should return the correct value for sampleInput1", () => {
    expect(findAdapterDifferences(sampleInput1)).toEqual(35);
  });

  it("should return the correct value for sampleInput2", () => {
    expect(findAdapterDifferences(sampleInput2)).toEqual(220);
  });

  it("should return the correct value for input", () => {
    expect(findAdapterDifferences(input)).toEqual(2738);
  });
});

describe("findTotalCombinations", () => {
  it("should return the correct value for sampleInput1", () => {
    expect(findTotalCombinations(sampleInput1)).toEqual(8);
  });

  it("should return the correct value for sampleInput2", () => {
    expect(findTotalCombinations(sampleInput2)).toEqual(19208);
  });

  it.skip("should return the correct value for input", () => {
    expect(findTotalCombinations(input)).toEqual(0);
  });
});
