import getRandomDigit from 'lib/getRandomDigit';

export const startData = {
  isWon: [null],
  timeForRemb: 2000,

  fails: 0,
  maxFails: 0.3, // in percent
  
  currentInd: 0,
  quantity:5,
  arr: [],
}


export function checkСorrectness (variableVal, state) {
  const verificationVal = state.arr[state.currentInd];

  let res = (
    verificationVal === variableVal
    ? "CORRECT"
    : "INCORRECT"
  );

  if(state.quantity === state.currentInd+1) {
    const ratioOfNums = state.fails / state.quantity;

    res = (
      ratioOfNums < state.maxFails
      ? "WIN"
      : "LOSE"
    )
  }

  return res;
}

export function getRandomNums(quantity) {
  const nums = [];
  for(let i = 0; i < quantity; i++) {
    nums[i] = getRandomDigit(0,9);
  }

  return nums;
}