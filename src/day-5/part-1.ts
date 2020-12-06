export const SAMPLE_DATA = ["BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"];

export interface SeatEntity {
  row: number;
  column: number;
  seatId: number;
}

export interface SeatingTable {
  [key: string]: SeatEntity;
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
 * Decode boarding pass strings into a results object containing
 * the row, column and seatId for each passenger.
 */
export function decodePasses(values: string[]): SeatingTable {
  const results: SeatingTable = {};
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

/**
 * Find the highest number seatId in the results from all decoded
 * boarding pass strings (solution for part 1)
 */
export function getHighestSeatId(values: string[]): number {
  const decodedPasses = decodePasses(values);
  const highestSeat = Object.values(decodedPasses).reduce((prev, curr) =>
    prev.seatId > curr.seatId ? prev : curr
  );
  return highestSeat.seatId;
}
