const Welcome = () => {
  console.log(
    `
    Hi, welcome to Advent of Code 2021! 
    
    You will find my solutions to the questions in TypeScript in this repo.

    Prerequisites:
      - nvm 
      - Node version v17.2.0

    Before running to get answers to the questions:
      - npm install
    
    To get my answers to the day-{x}, run
      - npx ts-node src/day-{x}.ts
    `
  );
};

Welcome();
