import getRandomDigit from 'lib/getRandomDigit';
import getMaxFails  from "lib/getMaxFails";

export const startData = {
  isWon: [null],
  timeForRemb: 2000,

  fails: 0,
  maxFails: 0.2,
  
  currentInd: 0,
  quantity:5,
  arr: [],
}


export function checkСorrectness (variableVal, state) {
  const verificationVal = state.arr[state.currentInd];
  // console.log(variableVal, verificationVal)
  let res = (
    verificationVal === variableVal
    ? "CORRECT"
    : "INCORRECT"
  );
  console.log(state.fails ,state.quantity)
  if(state.quantity === state.currentInd+1) {
    
    res += "_"+(
      state.fails+1 >= getMaxFails(state.quantity, state.maxFails)
      ? "LOSE"
      : "WIN"
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
