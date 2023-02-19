import { useEffect, useState, useRef } from "react";

import FinishGame from 'lib/components/FinishGame';
import Settings from "./Settings";

import * as logic from './logic';

export function Game () {

  const refRandNum_field = useRef(null);

  const [timeIDS,setTimeIDS] = useState({
    timeout: [],
    interval: [],
  })

  const [state, setNewState] = useState(logic.startData);


  function checker({target}) {
    if(target.validity.valid) {
      target.disabled = true;

      const nextItem = () => {
        return target?.parentElement?.nextElementSibling?.children[0]
      };

      switch (logic.checkСorrectness(+target.value, state)) {
        case "CORRECT": 
          nextItem()?.focus();
          target.classList.add("correct"); 
          break;

        case "INCORRECT": 
          state.fails++;
          target.value = state.arr[state.currentInd];
          target.classList.add("incorrect");
          nextItem()?.focus();
          break;
          
        case "CORRECT_WIN": 
          target.classList.add("correct");
          setNewState({...state,isWon: [true]}); 
          return;

        case "INCORRECT_WIN": 
          target.classList.add("incorrect");
          setNewState({...state,isWon: [true]}); 
          return;
          
        case "CORRECT_LOSE":
          target.classList.add("correct");
          setNewState({...state, isWon:[false]}); 
          return;
        
        case "INCORRECT_LOSE":
          state.fails++;
          target.classList.add("incorrect");
          setNewState({...state,isWon: [false]}); 
          return;
      }

      state.currentInd++;
      setNewState({...state})
    }
    else target.value = ""
  }

  
  function startAnim() {
    const field = refRandNum_field.current;

    const randomizer = (startTime) => {
      const delta = Date.now() - startTime;
      return Math.floor(delta / 10) % 9;
    }

    const toggleRondomizer = (action, startTime) => {
      const actions = {
        showAnimOfNumbers: randomizer.bind(null,startTime),
        showRealNumbers: (count) => state.arr[count],
        showEmptyString: () => ""
      }
      
      let count = 0;
      for(const item of field.children ) {
        item.children[0].value = actions[action](count++);
      }
    }
    
    const delayAnim = 2000; 
    const startTime = Date.now();
    const timeID_forCounter = setInterval(() => {
      toggleRondomizer("showAnimOfNumbers", startTime);
    }, 50)
   
    const timeID_forAnimation = setTimeout(() => {
      clearTimeout(timeID_forAnimation);
      clearInterval(timeID_forCounter);
      toggleRondomizer("showRealNumbers");
    },delayAnim);

    const timeID_forShowNums  = setTimeout(() => {
      clearTimeout(timeID_forShowNums);
      toggleRondomizer("showEmptyString");
    }, state.timeForRemb+delayAnim);

    timeIDS.timeout.push(timeID_forAnimation);
    timeIDS.timeout.push(timeID_forShowNums);
    timeIDS.interval.push(timeID_forCounter);
    setTimeIDS(timeIDS);
  }
  
  function clearTimeId() {
    timeIDS.timeout.forEach((ID) => clearTimeout(ID));
    timeIDS.interval.forEach((ID) => clearInterval(ID));
    setTimeIDS({
      timeout: [],
      interval: []
    })
  }

  function restartGame(changedState) {
    const newState = {
      ...logic.startData,
      ...changedState,
      stateId: [Math.random()],
    };
    
    newState.arr =  logic.getRandomNums(
      newState.quantity
    );
    

    setNewState(newState);
    clearTimeId()
  }

  function resetGame() {
    const newState = {
      ...logic.startData,
      stateId: [Math.random()],
    };

    newState.arr =  logic.getRandomNums(
      newState.quantity
    );

    setNewState(newState);
    clearTimeId()
  }

  useEffect(() => {
    restartGame()
  },[])

  useEffect(() => {
    startAnim()
  },[state.stateId])

  return (
    <>
      <Settings {...{restartGame,resetGame, state}}/>
      <FinishGame flag={state.isWon} {...{restartGame}}/>

      <div className="RandNum" key={state.stateId} >
        <div>
          <span>ошибки: {state.fails}/{Math.round(state.quantity * state.maxFails)}</span>
          
          <div className="RandNum_field" ref={refRandNum_field}>
            {state.arr.map((_,i) => {
              return (
                <div key={i} className="RandNum_field_item">
                  <input 
                      type="text"
                      onInput={checker}
                    />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}


export default {
  Game,
  name: "RandNum",
}