import input from "./input";
import { findTwoEntries, multiplyValues } from "./part-1";

describe("findTwoEntries", () => {
  it("should return the correct entries", () => {
    expect(findTwoEntries(input, 2020)).toEqual([1263, 757]);
    expect(multiplyValues([1263, 757])).toEqual(956091);
  });
});
