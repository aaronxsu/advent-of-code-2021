const fs = require("fs");
const linesInput: string[] = fs.readFileSync("src/day-5-input.txt").toString().split("\n");
interface Pair {
  start: number[];
  end: number[];
}

interface CounterDict {
  [id: string]: number;
}

const parser = (str: string): number => parseInt(str, 10);

let counterDict: CounterDict = {};
let counter = 0;
for (let i = 0; i < linesInput.length; i++) {
  const [start, end] = linesInput[i].split(" -> ");
  const [x1, y1] = start.split(",").map(parser);
  const [x2, y2] = end.split(",").map(parser);
  if (x1 === x2) {
    for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
      const key = `${x1},${j}`;
      if (counterDict[key] === undefined) counterDict[key] = 1;
      else if (counterDict[key] === 1) {
        counterDict[key] += 1;
        counter++;
      } else {
        counterDict[key] += 1;
      }
    }
  }
  if (y1 === y2) {
    for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
      const key = `${j},${y1}`;
      if (counterDict[key] === undefined) counterDict[key] = 1;
      else if (counterDict[key] === 1) {
        counterDict[key] += 1;
        counter++;
      } else {
        counterDict[key] += 1;
      }
    }
  }

  if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
    if ((x1 - x2) * (y1 - y2) >= 0) {
      let j = Math.min(x1, x2);
      let k = Math.min(y1, y2);
      while (j <= Math.max(x1, x2)) {
        const key = `${j},${k}`;
        if (counterDict[key] === undefined) counterDict[key] = 1;
        else if (counterDict[key] === 1) {
          counterDict[key] += 1;
          counter++;
        } else {
          counterDict[key] += 1;
        }
        j++;
        k++;
      }
    } else {
      let j = Math.min(x1, x2);
      let k = Math.max(y1, y2);
      while (j <= Math.max(x1, x2)) {
        const key = `${j},${k}`;
        if (counterDict[key] === undefined) counterDict[key] = 1;
        else if (counterDict[key] === 1) {
          counterDict[key] += 1;
          counter++;
        } else {
          counterDict[key] += 1;
        }
        j++;
        k--;
      }
    }
  }
}

console.log(counter);
// console.log(xMax, yMax);
