const fs = require("fs");

let counterDict: { [id: string]: number };
let counter: number;

const init = () => {
  counterDict = {};
  counter = 0;
};

const parser = (str: string): number => parseInt(str, 10);

const getLines = (filePath: string): string[] => fs.readFileSync(filePath).toString().split("\n");

const updateCounterP1 = (min: number, max: number, isX: boolean, keyPart: number): void => {
  for (let j = min; j <= max; j++) {
    const key = isX ? `${keyPart},${j}` : `${j},${keyPart}`;
    if (counterDict[key] === undefined) counterDict[key] = 1;
    else if (counterDict[key] === 1) {
      counterDict[key] += 1;
      counter++;
    } else {
      counterDict[key] += 1;
    }
  }
};

const updateCounterP2 = (j: number, k: number, max: number, isPositive: boolean): void => {
  while (j <= max) {
    const key = `${j},${k}`;
    if (counterDict[key] === undefined) counterDict[key] = 1;
    else if (counterDict[key] === 1) {
      counterDict[key] += 1;
      counter++;
    } else {
      counterDict[key] += 1;
    }
    j++;
    isPositive ? k++ : k--;
  }
};

const countIntersect = (filePath: string, includeDiagonal: boolean) => {
  init();
  const linesInput = getLines(filePath);
  for (let i = 0; i < linesInput.length; i++) {
    const [start, end] = linesInput[i].split(" -> ");
    const [x1, y1] = start.split(",").map(parser);
    const [x2, y2] = end.split(",").map(parser);

    if (x1 === x2) {
      updateCounterP1(Math.min(y1, y2), Math.max(y1, y2), true, x1);
    } else if (y1 === y2) {
      updateCounterP1(Math.min(x1, x2), Math.max(x1, x2), false, y1);
    }

    if (includeDiagonal && Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
      if ((x1 - x2) * (y1 - y2) >= 0) {
        updateCounterP2(Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), true);
      } else {
        updateCounterP2(Math.min(x1, x2), Math.max(y1, y2), Math.max(x1, x2), false);
      }
    }
  }
  console.log(`Answer to puzzle ${includeDiagonal ? 2 : 1}: ${counter}`);
};

countIntersect("src/day-5-input.txt", false);
countIntersect("src/day-5-input.txt", true);
