interface FishDict {
  [id: string]: number;
}
let fishes = [
  5, 1, 1, 4, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 1, 1, 1, 3, 5, 1, 1, 1, 5, 4, 1, 1, 1, 2, 2, 1, 1, 1, 2,
  1, 1, 1, 2, 5, 2, 1, 2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 4, 1, 1, 1, 5, 4, 1, 1, 3, 3, 2, 1, 1, 1, 5, 1, 1, 4,
  1, 1, 5, 1, 1, 5, 1, 2, 3, 1, 5, 1, 3, 2, 1, 3, 1, 1, 4, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 4, 4, 1, 5, 1, 1, 3,
  5, 1, 1, 5, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 5, 1, 1, 1, 1,
  4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 3, 1, 2, 1, 2, 1, 3, 1, 3, 4, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1,
  2, 2, 1, 2, 4, 1, 1, 3, 1, 1, 1, 5, 1, 3, 1, 1, 1, 5, 5, 1, 1, 1, 1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5,
  1, 4, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 2, 1, 4, 1, 5, 1, 5, 1,
  1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 4, 3, 1, 1, 4,
];

const initDict: FishDict = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0 };

const initFishes = (allFishes: number[]): FishDict => {
  let fishDict: { [key: string]: number } = { ...initDict };
  for (let i = 0; i < allFishes.length; i++) {
    fishDict[fishes[i]] += 1;
  }
  return fishDict;
};

// time complexity: O(numDays * len(initDict)) = O(numDays * 9) = O(numDays)
const population = (numDays: number): number => {
  let fishDict = initFishes(fishes);
  for (let i = 0; i < numDays; i++) {
    let fishItr = Object.entries(fishDict);
    let newLife: { [key: string]: number } = { ...initDict };
    for (let i = 0; i < fishItr.length; i++) {
      const [key, count] = fishItr[i];
      const days = parseInt(key, 10);
      if (count > 0 && days > 0) {
        newLife[days - 1] += count;
      } else if (count > 0 && days === 0) {
        newLife[6] += count;
        newLife[8] = count;
      }
    }
    fishDict = { ...newLife };
  }
  return Object.values(fishDict).reduce((acc, val) => acc + val, 0);
};

console.log(`Answer to puzzle 1: ${population(80)}`);
console.log(`Answer to puzzle 1: ${population(256)}`);
