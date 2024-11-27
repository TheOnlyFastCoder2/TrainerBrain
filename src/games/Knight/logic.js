import getRandomDigit from 'lib/getRandomDigit';
import {knight,convertToCoordSys} from './patterns';

export const startData = {
  isWon: [null],

  sequence: {min:2, max:5},
  currentMove: 0, 
  moves: [],
}


export function getMovesWithState (cells, currentState) {
  const newMoves = [];
  let maxMoves =  currentState.sequence.max+1;

  while (maxMoves) {
    const indexOfMove = getRandomDigit(0,knight.moves.length-1);
    const nextMove = convertToCoordSys(knight.moves[indexOfMove],
      newMoves[0] === undefined
      ? getRandomDigit(0,64)
      : newMoves.at(-1)
    );

    if(cells[nextMove]) {
      newMoves.push(nextMove);
      --maxMoves;
    }
  }

  return {
    ...currentState,
    moves: newMoves
  };
}

export function checkMove(featureMove, currentState) {
  let {currentMove,moves,sequence} = currentState;

  if(currentMove === sequence.max) return 'WIN';
  else {
    return (
      moves[currentMove+1] === featureMove
      ? "CORRECT"
      : "INCORRECT"
    )
  }
}