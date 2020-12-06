import { decodePasses } from "./part-1";

export function getSortedSeatIds(values: string[]): number[] {
  const decodedPasses = decodePasses(values);
  const sortedSeats = Object.values(decodedPasses).sort(
    (a, b) => a.seatId - b.seatId
  );
  return sortedSeats.map((entity) => entity.seatId);
}

/**
 * Solution for Part 2
 *
 * @param values
 */
export function getMySeat(values: string[]): number {
  const seatIds = getSortedSeatIds(values);
  let missing = 0;
  for (let i = 0; i < seatIds.length; i++) {
    if (seatIds[i] - seatIds[i - 1] !== 1) {
      missing = seatIds[i] - 1;
    }
  }
  return missing;
}
