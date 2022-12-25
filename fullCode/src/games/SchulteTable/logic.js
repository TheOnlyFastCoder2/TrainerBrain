import * as forGame from 'lib/forGame';


export const startData = {
  fails: 0,
  successes: 0,
  currCard: 0,

  cards: {
    state: [],
    correctСells: []
  },

  sequence: {min: 3, curr: 3},

  timer: {
    delay: 1000, // in second
    startTime: 20,
  },
  
  gridOfCells: {
    quantity: 64,
    percent: 11.5,
    curr: 3,
  }
}

export function shuffle (arr) {
  let length = arr.length; 
  while(length) {
    --length;
  }
}

export function getRandomCards(...args) {
  const {state,correctСells} = forGame.getRandomCells.call(null, ...args);
  return {
    state: state,
    correctСells
  };
}