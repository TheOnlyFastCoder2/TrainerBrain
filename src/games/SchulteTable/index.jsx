import { useEffect } from 'react';
import { useState } from 'react';
import * as logic from './logic';

export function Game () {
  const [timer, setTimer] = useState(logic.startData.timer);
  const [state, setNewState] = useState(logic.startData);

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

  }

  function checkMove(ind) {
    const correctInd = state.cards.correctСells[state.currCard];
    if(correctInd === ind) {
      newState({...state, currCard: state.currCard+1});
    }
  }

  function startTimer() {
    let time = timer.startTime;

    const timeID = setTimeout(() => {
      setTimer({...timer, startTime: time - 1});
      clearTimeout(timeID);
    }, timer.delay)
  }

  useEffect(() => {
    restartGame();
  },[]) 

  useEffect(() => {
    if(timer.startTime > 0) {
      startTimer()
    }
  },[timer.startTime,state.currCard])

  return (
    <div className="SchulteTable">
      <div className="SchulteTable_panel">
        <div className="SchulteTable_panel_timer">
          timer: {timer.startTime}
        </div>
        <div className="SchulteTable_panel_answer">
          {
            state.cards.state.length != 0 
            && "currNum:" + state.cards.correctСells[state.currCard]
          }
        </div>
      </div>
      <div className="SchulteTable_field" style=
        {{
          gridTemplateColumns: `repeat(auto-fill, ${state.gridOfCells.percent}%)`,
          gridTemplateRows: `repeat(auto-fill, ${state.gridOfCells.percent}%)`,
        }}>
          
          {state.cards.state.map((_,i) => {
            return <button onClick={() => checkMove(i)} key={i}>{i}</button>
          })}
      </div>
    </div>
  )
}

export default {
  Game,
  name: "Schulte Table",
}