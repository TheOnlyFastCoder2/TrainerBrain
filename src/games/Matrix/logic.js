import * as forGame from 'lib/forGame';
import getMaxFails  from "lib/getMaxFails";

export const startData = {
  isWon: [null],
  cards: [],
  currCard:0,

  fails: 0,
  maxFails: 0.4,
  successes: 0,

  withOrderOf: false,

  timeShow: {min:2, max: 20, curr: 5},
  sequence: {min: 3, curr: 3, max: 20},

  gridOfCells: {
    quantity: 64,
    percent: 11.5,
    curr: 3,
  }
}

export function getRandomCards(...args) {
  return forGame.getRandomCells.call(null, ...args).state;
}

export function checkMove (target, state) {
  let resault;
  let {successes, fails} = state;

  const orderOfNums = +target.textContent;
  const isCorrectCard = target.classList.contains("true");

  if(isCorrectCard) {
    resault = "CORRECT";
    successes += 1;
  }
  else {
    resault = "INCORRECT";
    fails += 1;
  }

  if(state.withOrderOf) {
    if(isCorrectCard && successes !== orderOfNums) {
      resault = "LOSE";
    }
  }
  
  if(fails >= getMaxFails(state.sequence.curr, state.maxFails)) {
    resault = "LOSE";
  }

  if(successes === state.sequence.curr) {
    resault = "WIN";
  }

  return resault;
}