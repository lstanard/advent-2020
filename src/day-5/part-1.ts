import input from "./input";

export const SAMPLE_DATA = ["BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"];

export interface PassengerSeat {
  row: number;
  column: number;
  seatId: number;
}

export interface PassengerSeating {
  [key: string]: PassengerSeat;
}

function getRowOrColumn(
  steps: string,
  end: number,
  lowerDirection: string,
  upperDirection: string
): number {
  let result = 0;
  let temp: [number, number] = [0, end];
  for (let i = 0; i < steps.length; i++) {
    const direction = steps[i];
    const half = Math.floor((temp[1] - temp[0]) / 2);
    if (direction === lowerDirection) {
      temp[1] = temp[0] + half;
      if (i === steps.length - 1) {
        result = temp[0];
      }
    } else if (direction === upperDirection) {
      temp[0] = temp[1] - half;
      if (i === steps.length - 1) {
        result = temp[1];
      }
    }
  }
  return result;
}

/**
 * Decode boarding pass strings
 */
export function decodePasses(values: string[]): PassengerSeating {
  const results: PassengerSeating = {};
  values.forEach((value) => {
    const row = getRowOrColumn(value.slice(0, 7), 127, "F", "B");
    const column = getRowOrColumn(value.slice(7, value.length), 7, "L", "R");
    results[value] = {
      row,
      column,
      seatId: row * 8 + column,
    };
  });
  return results;
}

export function getHighestSeatId(input: string[]): number {
  const decodedPasses = decodePasses(input);
  const highestSeat = Object.values(decodedPasses).reduce((prev, curr) =>
    prev.seatId > curr.seatId ? prev : curr
  );
  return highestSeat.seatId;
}
