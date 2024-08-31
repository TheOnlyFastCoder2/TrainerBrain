import { useEffect, useState, useRef } from "react";
import FinishGame from "lib/components/FinishGame";

import * as logic from './logic';
import Settings from "./Settings";



export  function Game () {
  const refMatrix = useRef(null);
  const timeID = useRef(0);
  const [unclickable, setUnclickable] = useState("");

  const [state,setNewState] = useState(logic.startData);

  function checkCard ({target}) {
    const res = logic.checkMove(target,state)

    switch(res) {
      case "CORRECT" : setNewState({...state, successes: state.successes+1}); break;
      case "INCORRECT" : setNewState({...state, fails: state.fails+1}); break;
      case "WIN": setNewState({...state, isWon: [true]}); break;
      case "LOSE": setNewState({...state, isWon: [false]}); break;
    }
    target.classList.add("rotation");
  } 

  function disablePointerEvent () {    
    setUnclickable("unclickable");

    timeID.current = setTimeout(() => {
      setUnclickable("");
      clearTimeout(timeID.current);
    },state.timeShow.curr*1000);
  }

  
  useEffect(() => {
    restartGame();
    return () => {
      clearTimeout(timeID.current);
      setUnclickable("");
    }
  },[])

  function restartGame (chanedState) {
    const newState = {
      ...state,
      ...chanedState,

      idState:  Math.random(),
      isWon: [null],
      fails: 0,
      successes: 0
    }

    newState.cards = logic.getRandomCards(
      newState.gridOfCells.quantity,
      newState.sequence.curr
    )

    setNewState(newState);
    disablePointerEvent();
  }

  function resetGame() {
    setNewState({
      ...logic.startData,
      idState:  Math.random(),
      cards: logic.getRandomCards(
        logic.startData.gridOfCells.quantity,
        logic.startData.sequence.curr
      )
    });

    disablePointerEvent();
  }

  return (
    <>  
      <FinishGame flag={state.isWon} {...{restartGame}}/>
      <Settings {...{restartGame,resetGame,state}}/> 

      <div className={`Matrix ${unclickable}`} key={state.idState} ref={refMatrix} style=
        {{
          gridTemplateColumns: `repeat(auto-fill, ${state.gridOfCells.percent}%)`,
          gridTemplateRows: `repeat(auto-fill, ${state.gridOfCells.percent}%)`,
        }}
      >

        {state.cards.map(({isCorrect,orderOfNums},i) => {

          return  (
            <button 
              key={i}
              onClick={checkCard}
              className={`Matrix_case ${isCorrect}`}>
              <div className="Matrix_case_front" style={{animationDuration: state.timeShow.curr+"s"}}/>
              <div className="Matrix_case_back" style={{animationDuration: state.timeShow.curr+"s"}}>
                {state.withOrderOf && isCorrect && orderOfNums}
              </div>
            </button>
            )
        })}
      </div>
    </>
  )
}

export default {
  Game,
  name: "Matrix",
}