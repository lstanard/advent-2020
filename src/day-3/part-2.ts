import input from "./input";

function getTrees(moveRight: number, moveDown = 1): number {
  let pos = 0;
  let trees = 0;
  for (let i = moveDown; i < input.length; i += moveDown) {
    const row = input[i];
    const nextPos =
      pos + moveRight >= row.length
        ? 0 + (pos + moveRight - row.length)
        : pos + moveRight;
    trees = trees + (row[nextPos] === "#" ? 1 : 0);
    pos = nextPos;
  }
  return trees;
}

const slope1 = getTrees(1);
const slope2 = getTrees(3);
const slope3 = getTrees(5);
const slope4 = getTrees(7);
const slope5 = getTrees(1, 2);
const result = slope1 * slope2 * slope3 * slope4 * slope5;
console.log("result", result); // 1260601650
