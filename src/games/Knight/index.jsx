import { useEffect, useRef, useState } from 'react';

import * as logic from './logic';

import Settings from "./Settings";
import FinishGame from 'lib/components/FinishGame';

import img_knight from 'imgs/knight.png';


export function Game () {
  const refFigure = useRef(null);
  const refBoard = useRef(null);
  
  const [state,setNewState] = useState(logic.startData);
  let [timeID,setTimeID] = useState(0);

  function setMove(cell, featureMove) {
    const result = logic.checkMove(featureMove, state);

    switch(result) {
      case "WIN": 
        transferFigure(featureMove);
        setNewState({...state,isWon: [true]}); 
        break;
      
      case "INCORRECT": 
        setNewState({...state,isWon: [false]}); 
        break;

      case "CORRECT": 
          cell.classList.add("correct")
          transferFigure(featureMove);
          setNewState({
            ...state,
            currentMove: ++state.currentMove
          })
          break;
    }
  }
  
  function transferFigure(move) {
    if(refBoard.current != null) {
      const figure = refFigure.current;
      const cells = refBoard.current.children;
  
      figure.style.top = cells[move].offsetTop+"px";
      figure.style.left = cells[move].offsetLeft+"px";
    }
  }

  function doesInitialMoves (moves) {
    let nextMove = moves.length;
    let timeID = 0;

    transferFigure(moves[nextMove-1]);

    timeID = setInterval(() => {
      if(--nextMove == 0) 
        clearInterval(timeID)
  
      transferFigure(moves[nextMove]);
    },850);

    setTimeID(timeID);
  }

  useEffect(() => {
    restartGame();
  },[])


  function restartGame(chanedState) {
    const newState = logic.getMovesWithState(
      [...refBoard.current.children],
      {
        idState: Math.random(),
        ...logic.startData,
        ...chanedState,
      }
    );
    
    clearInterval(timeID);
    doesInitialMoves(newState.moves);
    setNewState(newState);
  }

  function resetGame() {
    const newState = logic.getMovesWithState(
      [...refBoard.current.children],
      {
        idState: Math.random(),
        ...logic.startData,
      }
    );
    
    clearInterval(timeID);
    doesInitialMoves(newState.moves);
    setNewState(newState);
  }

  return  (
    <>
      <FinishGame flag={state.isWon} {...{restartGame}}/>

      <Settings {... {
          resetGame,
          restartGame,
          setNewState,
          state,
      }}/>
      
      <div className="Knight ">
          <div className="Figure" ref={refFigure}>
            <img src={img_knight}/>
          </div>
          <div key={state.idState} className="Knight_chessBoard start" ref={refBoard}>
              <Grid {...{setMove}}/>
          </div>
      </div>
    </>
  )
}

function Grid({setMove}) {
  let row = 0;
  return Array.from(new Array(64)).map((_,i) => {
    if( i % 8 === 0) row++;
    return (
      <div 
        key={i} 
        onClick={({target}) => setMove(target, i)}
        className={`${i % 2 === row % 2}`}/>
    )
  })
}

export default {
  Game,
  name: "Knight",
}