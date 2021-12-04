const fs = require("fs");

const bingoInput: string[] = fs.readFileSync("src/day-4-input.txt").toString().split("\n");

const calls = bingoInput[0].split(",").map(c => parseInt(c, 10));

const MARKER = Number.MAX_SAFE_INTEGER;

interface BoardWithCall {
  board: Board;
  call: number;
}

type BoardWithCalls = BoardWithCall[];

class Board {
  nums: number[][];
  bingo: boolean;
  marker: number;
  occurance: { [key: number]: number };

  constructor() {
    this.nums = [];
    this.bingo = false;
    this.marker = MARKER;
    this.occurance = {};
  }

  addEmptyRow(): void {
    this.nums.push([]);
  }

  addNum(num: number): void {
    this.nums[this.nums.length - 1].push(num);
    if (this.occurance[num] !== undefined) this.occurance[num] += 1;
    else this.occurance[num] = 1;
  }

  markBingo(num: number): void {
    for (let i = 0; i < this.nums.length; i++) {
      let countMin = 0;
      for (let j = 0; j < this.nums[i].length; j++) {
        if (this.nums[i][j] === num) this.nums[i][j] = this.marker;
        if (this.nums[i][j] === this.marker) countMin++;
      }
      if (countMin === this.nums[i].length) {
        this.bingo = true;
        return;
      }
    }
    this.markBingoByColumn();
  }

  markBingoByColumn(): void {
    for (let j = 0; j < this.nums[0].length; j++) {
      let countMin = 0;
      for (let i = 0; i < this.nums.length; i++) {
        if (this.nums[i][j] === this.marker) countMin++;
      }
      if (countMin === this.nums.length) {
        this.bingo = true;
        return;
      }
    }
  }
}

const createBoards = (): Board[] => {
  let boards: Board[] = [];
  for (let i = 1; i < bingoInput.length; i++) {
    if (bingoInput[i] !== "") {
      let board = boards[boards.length - 1];
      board.addEmptyRow();
      const numStrings = bingoInput[i].split(/\s+/).filter(Boolean);
      for (let k = 0; k < numStrings.length; k++) board.addNum(parseInt(numStrings[k]));
    } else boards.push(new Board());
  }
  return boards;
};

const getSum = (nums: number[][]): number => {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[i][j] !== MARKER) sum += nums[i][j];
    }
  }
  return sum;
};

const getFirstBingoBoard = (boards: Board[]): BoardWithCall | null => {
  for (let i = 0; i < calls.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      if (board.occurance[calls[i]]) {
        board.markBingo(calls[i]);
        if (board.bingo) {
          let call = calls[i];
          return { board, call };
        }
      }
    }
  }
  return null;
};

const getAllBingoBoards = (boards: Board[]): BoardWithCalls => {
  const allBoards = [];
  let includedBoardIdx = new Set();
  for (let i = 0; i < calls.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      if (board.occurance[calls[i]]) {
        board.markBingo(calls[i]);
        if (!includedBoardIdx.has(j) && board.bingo) {
          includedBoardIdx.add(j);
          allBoards.push({ board, call: calls[i] });
        }
      }
    }
  }
  return allBoards;
};

const scoreFirstBoard = (): number => {
  const boards = createBoards();
  const first = getFirstBingoBoard(boards);
  if (first !== null) {
    const { board, call } = first;
    return getSum(board.nums) * call;
  }
  return 0;
};

const scoreLastBoard = (): number => {
  const boards = createBoards();
  const allBoards = getAllBingoBoards(boards);
  if (allBoards.length) {
    const { board, call } = allBoards[allBoards.length - 1];
    return getSum(board.nums) * call;
  }
  return 0;
};

console.log(`Answer for puzzle 1: ${scoreFirstBoard()}`);
console.log(`Answer for puzzle 2: ${scoreLastBoard()}`);
