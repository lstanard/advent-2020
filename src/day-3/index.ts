import input from "./input";

// console.time("trees");

const move = 3;
let pos = 0;
let trees = 0;
for (let i = 1; i < input.length; i += 1) {
  const row = input[i];
  const nextPos =
    pos + move >= row.length ? 0 + (pos + move - row.length) : pos + move;
  trees = trees + (row[nextPos] === "#" ? 1 : 0);
  pos = nextPos;
}

// console.timeEnd("trees");
console.log("trees", trees); // correct answer = 181
