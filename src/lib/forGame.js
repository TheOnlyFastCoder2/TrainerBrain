import getRandomDigit from 'lib/getRandomDigit';

export function getRandomCells(quantity,max) {
  const correctСells = [];
  const state = Array.from(new Array(quantity)).map(() => ({
    isCorrect: false,
    orderOfNums: 0 
  }));

  while(max) {
    const card = getRandomDigit(0,quantity-1);

    if(!state[card].isCorrect) {
      state[card].isCorrect = true;
      state[card].orderOfNums = max;
      correctСells.push(card);
      --max;
    }
  }

  return {
    state,
    correctСells
  };
}