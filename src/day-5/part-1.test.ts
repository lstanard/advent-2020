import input from "./input";
import { decodePasses, getHighestSeatId, SAMPLE_DATA } from "./part-1";

describe("decodePasses", () => {
  it("should return the correct value", () => {
    expect(decodePasses(SAMPLE_DATA)).toEqual({
      BFFFBBFRRR: {
        seatId: 567,
        row: 70,
        column: 7,
      },
      FFFBBBFRRR: {
        seatId: 119,
        row: 14,
        column: 7,
      },
      BBFFBBFRLL: {
        seatId: 820,
        row: 102,
        column: 4,
      },
    });
  });
});

describe("getHighestSeatId", () => {
  it("should return the correct value", () => {
    expect(getHighestSeatId(SAMPLE_DATA)).toEqual(820);
    expect(getHighestSeatId(input)).toEqual(913);
  });
});
