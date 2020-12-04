import { validatePassports } from "./part-1";

describe("validatePassports", () => {
  it.skip("should return correct number of valid passports", () => {
    expect(validatePassports("./sample-input.txt")).toEqual(4);
  });
});
