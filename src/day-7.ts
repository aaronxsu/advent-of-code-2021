const fs = require("fs");

const parser10 = (str: string): number => parseInt(str, 10);

const getPositions = (filePath: string): number[] => fs.readFileSync(filePath).toString().split(",").map(parser10);

const positions = getPositions("src/day-7-input.txt");

const D7P1 = () =>
  Math.min(
    ...positions.reduce(
      (ac, pos) => [...ac, positions.reduce((acc, p) => (acc += Math.abs(pos - p)), 0)],
      [] as number[]
    )
  );

const D7P2 = () =>
  Math.min(
    ...Array.from(Array(Math.max(...positions)).keys()).reduce(
      (ac, pos) => [...ac, positions.reduce((acc, p) => acc + ((1 + Math.abs(pos - p)) * Math.abs(pos - p)) / 2, 0)],
      [] as number[]
    )
  );

console.log(`Puzzle 1: ${D7P1()}`);

console.log(`Puzzle 2: ${D7P2()}`);
